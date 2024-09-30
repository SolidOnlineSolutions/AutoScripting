import Client from 'ssh2-sftp-client';


class FTPPage {
    constructor() {
        this.Client = new Client();
    }

    async connectToFTP() {
        try {
            await this.Client.connect({
                host: process.env.FTP_HOST,
                port: 22,
                username: process.env.FTP_USER,
                password: process.env.FTP_PASSWORD,
                secure: true,
                readyTimeout: 30000
            });
            console.log('Connected to FTP server successfully');
        } catch (error) {
            console.error('Failed to connect to FTP server:', error);
            throw error; // Rethrow error for further handling if needed
        }
    }

    async uploadFile(filePath, remotePath) {
        try {
            await this.Client.put(filePath, remotePath);
            console.log(`File uploaded successfully to ${remotePath}`);
        } catch (error) {
            console.error('Error during file upload:', error);
            throw error; // Rethrow error for further handling if needed
        } finally {
            this.Client.end(); // Ensure connection is closed
        }
    }
}

export { FTPPage };
