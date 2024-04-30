const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/' });

// {
//     "name": "Jash Mehta",
//     "type": "Reader",
//     "price": 200.00,
//     "author": "David",
//     "description": "sfiisnf",
//     "pdf": "requirement.pdf",
//     "image": "krishna.jpg"
// }

async function addbooks(req, res, promisePool, userId) {
    try {
        const { name, type, price, author, description } = req.body;
        const pdfFile = req.files['pdf'] ? req.files['pdf'][0] : null; // Get uploaded PDF file object
        const imageFile = req.files['image'] ? req.files['image'][0] : null; // Get uploaded image file object

        // Check if required fields are missing
        if (!name || !type || !price || !author || !description || !pdfFile || !imageFile) {
            let missingFiles = [];
            // if (!pdfName) {
            //     missingFiles.push('PDF');
            //     console.log('PDF file is missing');
            // }
            // if (!imageName) {
            //     missingFiles.push('Image');
            //     console.log('Image file is missing');
            // }
            return res.status(400).json({ error: `Missing required fields or files: ${missingFiles.join(', ')}` });
        }
            // Move the PDF file to the public directory with original name
            const pdfPath = `public/${pdfFile.originalname}`;
            fs.writeFileSync(pdfPath, fs.readFileSync(pdfFile.path));
    
            // Move the image file to the public directory with original name
            const imagePath = `public/${imageFile.originalname}`;
            fs.writeFileSync(imagePath, fs.readFileSync(imageFile.path));

        // Insert data into the books table
        const query = `
            INSERT INTO books (user_id, name, type, price, author, description, pdf, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await promisePool.query(query, [userId, name, type, price, author, description, pdfFile.originalname, imageFile.originalname]);

        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}


module.exports = addbooks;

// Create the public directory if it doesn't exist
const publicDir = './public';
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}