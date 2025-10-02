<h1>Skillshare Downloader</h1>
<p>A Node.js script to download Skillshare course videos directly to your local machine. Supports automatic organization by course and video index.</p>

<hr>

<h3>Follow me to show support</h3>

<div align="center">
    <b>Join Me - </b>
  <a href="https://dsc.gg/hackfams" target="_blank">
    <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/discord/default.svg" width="52" height="40" alt="discord logo"  />
  </a>
  <a href="https://www.youtube.com/@l1ackoder?sub_confirmation=1" target="_blank">
    <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/youtube/default.svg" width="52" height="40" alt="youtube logo"  />
  </a>
  <a href="https://x.com/l1ackoder" target="_blank">
    <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/twitter/default.svg" width="52" height="40" alt="twitter logo"  />
  </a>
</div>

<h2>Folder Structure</h2>
<ul>
    <li><code>node_modules</code> - Node.js packages</li>
    <li><code>skillshare_courses</code> - Downloaded courses will appear here</li>
    <li><code>.gitignore</code></li>
    <li><code>index.js</code> - Main script</li>
    <li><code>package.json</code></li>
    <li><code>package-lock.json</code></li>
    <li><code>hack it.bat</code> - Run this to start downloading</li>
    <li><code>install_requirements.bat</code> - Install all required Node.js packages</li>
</ul>

<hr>

<h2>Requirements</h2>
<ul>
    <li><a href="https://nodejs.org/">Node.js</a> (LTS version recommended)</li>
    <li>npm (comes with Node.js)</li>
    <li>Google Chrome (or any browser) with <strong>Cookie Editor extension</strong> installed</li>
</ul>

<hr>

<h2>Step-by-Step Instructions</h2>

<h3>1️⃣ Install Node.js</h3>
<ol>
    <li>Go to <a href="https://nodejs.org/">https://nodejs.org/</a> and download the LTS version.</li>
    <li>Run the installer and make sure <strong>Add to PATH</strong> is checked.</li>
    <li>Verify installation in a terminal/command prompt:
        <pre><code>node -v
npm -v</code></pre>
    </li>
</ol>

<hr>

<h3>2️⃣ Install Required Packages</h3>
<p>Double-click the <code>install_requirements.bat</code> file. This will automatically install all Node.js dependencies needed to run the script:</p>
<ul>
    <li><code>progress</code></li>
    <li><code>chalk</code></li>
    <li><code>follow-redirects</code></li>
    <li><code>cloudflare-scraper</code></li>
    <li><code>node-fetch@2</code></li>
</ul>

<hr>

<h3>3️⃣ Find Required Cookies</h3>
<ol>
    <li>Open Chrome and go to <a href="https://www.skillshare.com/">Skillshare</a>.</li>
    <li>Log in to your account.</li>
    <li>Open <strong>Cookie Editor extension</strong>.</li>
    <li>Copy the following cookies:
        <ul>
            <li><code>PHPSESSID</code></li>
            <li><code>skillshare_user_</code></li>
        </ul>
    </li>
</ol>

<hr>

<h3>4️⃣ Get the Class ID</h3>
<ol>
    <li>Open the Skillshare course page you want to download.</li>
    <li>The class ID is in the URL. Example:
        <pre><code>https://www.skillshare.com/classes/&lt;CLASS-NAME&gt;/&lt;CLASS-ID&gt;</code></pre>
    </li>
    <li>Copy the numeric class ID (e.g., <code>1986526776</code>).</li>
</ol>

<hr>

<h3>5️⃣ Run the Script</h3>
<ol>
    <li>Double-click the <code>download.bat</code> file. You will be prompted to enter:
        <ul>
            <li>Class ID</li>
            <li>PHPSESSID</li>
            <li>skillshare_user_</li>
        </ul>
    </li>
    <li>After entering these values, the script will display the <strong>course title</strong> and start downloading all videos with a visual progress bar.</li>
</ol>
<ul>
    <li>Videos are saved in <code>skillshare_courses/&lt;Course-Name&gt;/</code></li>
    <li>Already downloaded videos are skipped automatically.</li>
</ul>

<hr>

<h3>6️⃣ Notes</h3>
<ul>
    <li>Only <strong>Windows</strong> is officially supported using the .bat files.</li>
    <li>Make sure your internet connection is stable.</li>
    <li>No subtitles are downloaded by default. You can configure this in <code>index.js</code> if desired.</li>
</ul>
