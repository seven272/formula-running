import multer from 'multer'
import fs from 'fs'

// Настройка хранилища

// const storage1 = multer.diskStorage({
//   //определяю директорию куда сохраняются изображения
//   destination: (req, file, cb) => {
//     //проверяю существует ли папка в которую загружаются изображения, если нет, то создаю
//     if (!fs.existsSync('uploads')) {
//       fs.mkdirSync('uploads')
//     }
//     if (file.fieldname === 'avatar') {
//       cb(null, 'uploads/avatars/')
//     } else if (file.fieldname === 'plan') {
//       cb(null, 'uploads/plans/')
//     } else if (file.fieldname === 'picture') {
//       cb(null, 'uploads/pictures/')
//     } else {
//       cb(null, 'uploads/')
//     }
//   },
//   //задаю уникальное имя для файла
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() +
//         '-' +
//         Math.round(Math.random() * 1e9) +
//         '-' +
//         file.originalname
//     )
//   },
// })

// Настройка фильтра файлов
// const fileFilter = (req, file, cb) => {
//   // Принимать изображения и PDF
//   const allowedTypes = [
//     'image/jpeg',
//     'image/png',
//     'image/gif',
//     'application/pdf',
//   ]

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true)
//   } else {
//     cb(
//       new Error(
//         'Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed.'
//       ),
//       false
//     )
//   }
// }

// Настройка Multer
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10МБ
//     files: 5,
//   },
// })

const storage = multer.diskStorage({
  //определяю директорию куда сохраняются изображения
  destination: (req, file, cb) => {
    //проверяю существует ли папка в которую загружаются изображения, если нет, то создаю
    if (!fs.existsSync('./src/uploads')) {
      console.log('Папки не существует, создаю ее')
      fs.mkdirSync('./src/uploads')
    }
    if (file.fieldname === 'avatar') {
      // проверка на наличие папки
      if (!fs.existsSync('./src/uploads/avatars')) { 
        console.log('Папки не существует, создаю ее')
        fs.mkdirSync('./src/uploads/avatars')
      }
      cb(null, './src/uploads/avatars')
    } else if (file.fieldname === 'plan') {
      // проверка на наличие папки
      if (!fs.existsSync('./src/uploads/plans')) {
        console.log('Папки не существует, создаю ее')
        fs.mkdirSync('./src/uploads/plans')
      }
      cb(null, './src/uploads/sounds/')
    } else if (file.fieldname === 'picture') {
      // проверка на наличие папки
      if (!fs.existsSync('./src/uploads/pictures')) {
        console.log('Папки не существует, создаю ее')
        fs.mkdirSync('./src/uploads/pictures')
      }
      cb(null, './src/uploads/pictures/')
    } else {
      cb(null, './src/uploads/')
    }
  },
  //задаю уникальное имя для файла
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        '-' +
        Math.round(Math.random() * 1e9) +
        '-' +
        file.originalname,
    )
  },
})

// Настройка фильтра файлов
const fileFilter = (req, file, cb) => {
  // Принимать изображения и PDF
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'audio/wav',
    'audio/mp3',
    'audio/mpeg',
  ]

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(
      new Error(
        'Неверный формат файла. Разрешены только JPEG, PNG, GIF, PDF, MP3, MPEG, WAV',
      ),
      false,
    )
  }
}

// Настройка Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10МБ
    files: 5,
  },
})

export default upload


