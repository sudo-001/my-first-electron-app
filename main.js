const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    ipcMain.handle('ping', () => 'pong')
    
    win.loadFile('index.html')
}

app.whenReady()
    .then(() => {
        createWindow()

        // L'application cra$it une fenêtre lorsqu'elle active mais sans fenêtre sur macos
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        })
    })

// Pour quitter quand on est pas sur macos
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})