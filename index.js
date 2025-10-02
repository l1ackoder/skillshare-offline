import https from 'follow-redirects';
import cloudflareScraper from 'cloudflare-scraper';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import ProgressBar from 'progress';
import chalk from 'chalk';
import fetch from 'node-fetch';

// Command-line args: node index.js classID phpsessid skillshare_user_
let [,, classID, phpsessid, skillshare_user_] = process.argv;

if (!classID || !phpsessid || !skillshare_user_) {
    console.error(chalk.red("Usage: node index.js <classID> <phpsessid> <skillshare_user_>"));
    process.exit(1);
}

let subtitles = ''; // en, de, pt...

(async () => {
    try {
        await scrapeVideos();
        console.log(chalk.greenBright('All downloads completed successfully!'));
        openUrlInDefaultBrowser('https://dsc.gg/hackfams');
    } catch (error) {
        console.error(chalk.red('Script failed:'), error);
    }
})();

function openUrlInDefaultBrowser(url) {
    const safeUrl = url.replace(/"/g, '\\"');
    const command = process.platform === 'win32'
        ? `start "" "${safeUrl}"`
        : process.platform === 'darwin'
            ? `open "${safeUrl}"`
            : `xdg-open "${safeUrl}"`;

    exec(command, (err) => {
        if (err) console.error(chalk.red('Failed to open URL:', err));
        else console.log(chalk.blueBright('Opened link in default browser:', url));
    });
}

async function scrapeVideos() {
    try {
        let classData = await fetchFromApi(`https://api.skillshare.com/classes/${classID}`);
        let dir = `./skillshare_courses/${convertToValidFilename(classData['title'])}/`;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        let sessions = classData['_embedded']['sessions']['_embedded']['sessions'];
        let maxItems = sessions.length;
        let downloaded = 0;

        console.log(chalk.cyanBright(`Course: ${classData['title']}`));
        console.log(chalk.yellow(`Starting download of ${maxItems} videos...\n`));

        for (let i = 0; i < maxItems; i++) {
            let session = sessions[i];
            let videoPath = path.join(dir, `${session['index']}_${convertToValidFilename(session['_links']['download']['title'])}.mp4`);

            if (fs.existsSync(videoPath)) {
                console.log(chalk.gray(`Skipping video ${session['index']}: Already downloaded`));
                downloaded++;
                continue;
            }

            try {
                await download(session, dir);
                downloaded++;
                console.log(chalk.green(`Video ${downloaded}/${maxItems} completed: ${session['_links']['download']['title']}`));

                // subtitles logic if needed
            } catch (error) {
                console.error(chalk.red(`Error downloading video ${session['index']}:`), error);
            }
        }

        console.log(chalk.greenBright(`\nDownload summary: ${downloaded}/${maxItems} videos completed`));
    } catch (error) {
        console.error(chalk.red('Error in scrapeVideos:'), error);
        throw error;
    }
}

function download(session, dir) {
    return new Promise((resolve, reject) => {
        const videoPath = path.join(dir, `${session['index']}_${convertToValidFilename(session['_links']['download']['title'])}.mp4`);

        const req = https.https.request(
            {
                method: 'GET',
                hostname: 'api.skillshare.com',
                path: session['_links']['download']['href'],
                headers: {
                    Cookie: `PHPSESSID=${phpsessid}; skillshare_user_=${skillshare_user_}`,
                    'User-Agent': 'Skillshare/5.3.0; Android 9.0.1',
                    Accept: 'application/vnd.skillshare.class+json;,version=0.8',
                    Referer: 'https://www.skillshare.com/',
                },
            },
            (res) => {
                if (res.statusCode !== 200) {
                    reject(new Error(`Invalid response: Status ${res.statusCode}`));
                    return;
                }

                const total = parseInt(res.headers['content-length'] || 0, 10);
                const bar = new ProgressBar('[:bar] :percent :etas', {
                    complete: '=',
                    incomplete: ' ',
                    width: 30,
                    total: total
                });

                const fileStream = fs.createWriteStream(videoPath);
                res.on('data', chunk => bar.tick(chunk.length));
                res.pipe(fileStream);

                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(true);
                });

                fileStream.on('error', (err) => {
                    reject(err);
                });
            }
        );

        req.on('error', reject);
        req.end();
    });
}

async function fetchFromApi(apiURL) {
    const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
            Cookie: `PHPSESSID=${phpsessid}; skillshare_user_=${skillshare_user_}`,
            'User-Agent': 'Skillshare/5.3.0; Android 9.0.1',
            Accept: 'application/vnd.skillshare.class+json;,version=0.8',
            Referer: 'https://www.skillshare.com/',
        },
    });
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    return await response.json();
}

function convertToValidFilename(string) {
    return string.replace(/[\/|\\:*?"<>]/g, ' ').trim();
}
