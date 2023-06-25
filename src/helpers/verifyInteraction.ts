import { NextFunction, Request, Response } from "express";
import nacl from 'tweetnacl';

export function verifyInteraction(publicKey: string) {
    return async function (req: Request, res: Response, next: NextFunction) {

        // Get the signature, timestamp, and body from the request
        const signature = req.get('X-Signature-Ed25519');
        const timestamp = req.get('X-Signature-Timestamp');
        const body = req.body;

        // Verify the signature
        const isVerified = nacl.sign.detached.verify(
            Buffer.from(timestamp + JSON.stringify(body)),
            Buffer.from(signature!, 'hex'),
            Buffer.from(publicKey, 'hex')
        );

        // If the signature is invalid, return a 401
        if (!isVerified)
            return res.status(401).json({ error: 'could not validate the request with the provided signature'});
        
        // Otherwise, continue
        next();
        
    }
}