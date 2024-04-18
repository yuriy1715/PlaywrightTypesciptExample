import * as dotenv from 'dotenv';
dotenv.config();

import Imap from 'imap';

const imapConfig: Imap.Config = {
    user: process.env.EMAIL_ADDRESS,
    password: process.env.EMAIL_IMAP_PASSWORD,
    host: 'imap.gmail.com',
    port: 993,
    tls: {
        rejectUnauthorized: false, // Ignore self-signed certificate
    },
};

export function openInbox(cb: (err: Error | null, box?: Imap.Box, imap?: Imap) => void) {
    const imap = new Imap(imapConfig);
    imap.once('ready', () => {
        imap.openBox('INBOX', true, (err, box) => {
            cb(err, box, imap); // Pass the 'imap' instance to the callback
        });
    });

    imap.once('error', (err) => {
        cb(err);
    });

    imap.once('end', () => {
        imap.end();
    });

    imap.connect();
}
export async function fetchVerificationCode(): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
        openInbox((err, box, imap) => {
            if (err) {
                reject(err);
                return;
            }

            const searchCriteria = ['UNSEEN', ['SUBJECT', 'Account - Email Verification']];
            const fetchOptions: Imap.FetchOptions = {
                bodies: 'TEXT',
                markSeen: true,
            };

            if (!box) {
                reject(new Error('Unable to open inbox.'));
                return;
            }

            const fetch = imap.seq.fetch(box.messages.total + ':*', fetchOptions);

            fetch.on('message', (msg) => {
                let emailBody = '';

                msg.on('body', (stream) => {
                    // Read the email body
                    stream.on('data', (chunk) => {
                        emailBody += chunk.toString('utf8');
                    });
                });

                msg.on('end', () => {
                    // Extract the verification code from the email body
                    const verificationCodeMatchFirstPart = emailBody.match(/>(\d)=/i);
                    const verificationCodeMatchSecondPart = emailBody.match(/\b(\d{5})\b/i);
                    if (verificationCodeMatchFirstPart && verificationCodeMatchSecondPart) {
                        const verificationCode1 = verificationCodeMatchFirstPart[1];
                        const verificationCode2 = verificationCodeMatchSecondPart[1];
                        const verificationCode = verificationCode1+verificationCode2;
                        resolve(verificationCode);
                    } else {
                        resolve(null); // If no verification code found
                    }
                });
            });

            fetch.on('error', (fetchErr) => {
                reject(fetchErr);
            });

            fetch.on('end', () => {
                imap.end();
            });
        });
    });
}

