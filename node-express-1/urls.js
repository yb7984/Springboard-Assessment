const fs = require('fs');
const axios = require('axios');

/**
 * Read the file and return a array of urls
 * @param {*} file 
 */
function readFile(file) {

    try {
        const content = fs.readFileSync(file, 'utf8');

        return content.split('\n');

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

/**
 * Write the content to file
 * @param {*} file 
 * @param {*} content 
 */
function writeFile(file, content) {
    fs.writeFileSync(file, content, "utf8");
}

/**
 * retrieve the content of the url
 * @param {*} url 
 */
async function getContent(url) {
    const resp = await axios.get(url);

    return resp.data;
}

/**
 * Return the host name of a url
 * @param {*} url 
 * @returns 
 */
function getHost(url) {
    let startIndex = url.indexOf('://') + 3;
    let endIndex = url.indexOf('/', startIndex);

    if (endIndex === -1) {
        endIndex = url.length;
    }

    return url.substring(startIndex, endIndex);
}

/**
 * run the whole script
 */
async function run() {
    const urls = readFile(process.argv[2]);

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];

        if (url.trim().length === 0) {
            continue;
        }

        const host = getHost(url);

        getContent(url)
            .then(content => {
                try {
                    writeFile(host, content);

                    console.log("Wrote to ", host);
                } catch (e) {
                    console.log("Couldn't write to ", host);
                }
            })
            .catch(err => {
                console.log("Couldn't download ", url);
            })
    }
}

//run the script
run();