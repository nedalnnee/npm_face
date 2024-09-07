const express = require('express');
const path = require('path');
const app = express();

// تقديم ملفات المشروع من المجلد public
app.use(express.static(path.join(__dirname, 'public')));

// تقديم نماذج Face-api.js
app.use('/models', express.static(path.join(__dirname, 'models')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`الخادم يعمل على المنفذ ${PORT}`));
