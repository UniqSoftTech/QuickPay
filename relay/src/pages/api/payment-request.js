export default function handler(req, res) {
    res.status(200).json({
        qrcode: 200000033862930,
        amount: Math.floor(Math.random() * 100) + 1,
        from: `User${Math.floor(Math.random() * 1000)}`,
    });
}
