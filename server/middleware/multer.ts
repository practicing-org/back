import multer from 'multer';

const upload = multer({dest:"./server/upload"});

export default upload;