const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { check,validationResult } = require('express-validator');
const crypto = require('crypto');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.static('public'));// Add this line to parse JSON requests

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    port:'3310',
    password:'',
    database: 'pfe3'
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images') // مسار كامل لمجلد الوجهة
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // تسمية ملف الصورة
    }
  });

app.post('/updateProfile', async (req, res) => {
    try {
        let { id, field, value } = req.body;
        console.log(id);

        // Hash the password if the field is 'password'
        if (field === 'password') {
            value = crypto.createHash('sha256').update(value).digest('hex');
        }

        const updateQuery = `UPDATE compte_login SET ${field} = ? WHERE id = ?`; // Example query, replace 'compte_login' with your actual table name
        await db.query(updateQuery, [value, id]); // Execute the update query

        res.status(200).send('Profile updated successfully');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Internal Server Error');
    }
});
  
  
const upload = multer({ storage: storage });
  

db.connect((err) => {
    if (err) {
        console.error('Connection to MySQL database failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

const sessionStore = new MySQLStore({
    expiration: 10080000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessiontbl',
        columnsNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, db);

app.use(session({
    secret: "rGK$#&9l@wqBcU3m",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24h cookie age
        secure: false
    }
}));

const nodemailer = require('nodemailer');

app.post("/uploadProfilePic", upload.single('profilePic'), (req, res) => {
    const { id } = req.body;
    const pic = req.file ? req.file.path : 'public/images/userPic.png';

    console.log("Received file path: " + pic); 
    console.log("Received user ID: " + id); 

    const insertQuery = `UPDATE compte_login SET photoProfil = ? WHERE id = ?`;

    db.query(insertQuery, [pic, id], (err, result) => {
        if (err) {
            console.error("Error updating profile picture:", err);
            return res.status(500).json({ message: "An error occurred." });
        }

        return res.status(200).json({ message: "Insert successful.", filePath: pic });
    });
});


app.use((req, res, next) => {
    req.db = db;
    next();
});

const generateVerificationCode = () => {
    const codeLength = 6;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
        code += Math.floor(Math.random() * 10); // توليد رقم عشوائي من 0 إلى 9
    }

    return code;
};



app.post('/sendVerificationCode', (req, res) => {
    const { email } = req.body;
    const verificationCode = generateVerificationCode();

    // إعداد خيارات البريد الإلكتروني
    const mailOptions = {
        from: 'madrassaty.platform@gmail.com', 
        to: email,
        subject: 'رمز التحقق',
        text: `رمز التحقق هو: ${verificationCode}`
    };

    // إرسال البريد الإلكتروني
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending verification code');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ result :verificationCode });        }
    });
});

// إعداد مرسل البريد
const transporter = nodemailer.createTransport({
    service: 'Gmail', // يمكنك استخدام خدمة البريد الإلكتروني الخاصة بك هنا (مثل Gmail أو Outlook أو غيرها)
    auth: {
        user: 'madrassaty.platform@gmail.com', // بريدك الإلكتروني
        pass: 'palj aihf obqf kxew' // كلمة مرور البريد الإلكتروني
    }
});
app.post('/envoierMessage', upload.single('file'), (req, res) => {
    const { email, from, text, sender } = req.body;
    const file = req.file;
    const filePath = file ? `http://localhost:5000/uploads/${file.filename}` : '';

    const mailOptions = {
        from: 'madrassaty.platform@gmail.com',
        to: email,
        subject: `Email from ${sender}`,
        text: `Cet email provient de : ${from}\n\nContenu :\n${text}`
    };

    if (file) {
        mailOptions.attachments = [{
            filename: file.originalname,
            path: file.path
        }];
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);

            // إدخال السجل في قاعدة البيانات
            const insertQuery = `
                INSERT INTO messages (email_sender, email_receiver, created_at, message, file)
                VALUES (?, ?, NOW(), ?, ?)
            `;
            db.query(insertQuery, [from, email, text, filePath], (err, result) => {
                if (err) {
                    console.error('Error inserting data into database:', err);
                    res.status(500).send('Error inserting data into database');
                } else {
                    console.log('Data inserted successfully into database:', result);
                    res.status(200).json({ message: 'Email sent and data inserted successfully' });
                }
            });
        }
    });
});


app.post("/restPassword",async(req,res)=>{
    const{email,newPassword}=req.body;
    console.log(email+newPassword);
    try {
       
            value = crypto.createHash('sha256').update(newPassword).digest('hex');
        

        const updateQuery = `UPDATE compte_login SET password = ? WHERE email = ?`; // Example query, replace 'compte_login' with your actual table name
        await db.query(updateQuery, [value, email]); // Execute the update query

        res.status(200).send('Profile updated successfully');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Internal Server Error');
    }

})

app.post("/testEmail",async(req,res)=>{
    const{email}=req.body;
    const sql = "SELECT * FROM compte_login WHERE email=?";
  db.query(sql, [email], (err, result) => {
        if (err) {
            return res.json("Error login:");
        }
        if (result.length > 0) {
          
            return res.json({ 
                status: "success", 
                
            });
        } else {
            return res.json("false");
        }
    });
})

app.post("/testPassword",async(req,res)=>{
    const{newPassword}=req.body;
    value = crypto.createHash('sha256').update(newPassword).digest('hex');
   console.log(newPassword+" "+value);
    const sql = "SELECT * FROM compte_login WHERE password=?";
  db.query(sql, [value], (err, result) => {
        if (err) {
            return res.json("Error :");
        }
        if (result.length > 0) {
          
            return res.json({ 
                status: "success", 
            });
        } else {
            return res.json("false");
        }
    });
})



app.post('/discipline', (req, res) => {
    const { id_parent, message } = req.body;
    console.log(id_parent, message);

    // Construct your SQL select query
    const selectQuery = `
      SELECT email FROM compte_login WHERE id = ?
    `;

    // Construct your SQL insert query
    const insertQuery = `
      INSERT INTO notifications (id_parent, notification, created_at)
      VALUES (?, ?, NOW())
    `;

    db.query(selectQuery, [id_parent], (err, result) => {
        if (err) {
            console.error('Error retrieving email:', err);
            res.status(500).send({ error: 'An error occurred while retrieving email.' });
        } else {
            if (result.length > 0) {
                const email = result[0].email;

                db.query(insertQuery, [id_parent, message], (err, result) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        res.status(500).send({ error: 'An error occurred while inserting data.' });
                    } else {
                        console.log('Data inserted successfully:', result);

                        const mailOptions = {
                            from: 'madrassaty.platform@gmail.com',
                            to: email,
                            subject: 'Discipline',
                            text: `${message}`
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.error('Error sending email:', error);
                                res.status(500).send('Error sending email');
                            } else {
                                console.log('Email sent:', info.response);
                                res.status(200).send({ message: 'Data inserted and email sent successfully!' });
                            }
                        });
                    }
                });
            } else {
                res.status(404).send({ error: 'Parent email not found.' });
            }
        }
    });
});


app.get('/demandes', (req, res) => {
    const roleValue = req.params.role;
    const sql = "SELECT * FROM comptes_signup";
    db.query(sql, [roleValue], (err, result) => {
        if (err) {
            console.error("Error fetching accounts by role:", err);
            return res.status(500).json({ message: "An error occurred while fetching accounts by role." });
        }

        if (result.length > 0) {
            return res.status(200).json({result});
        } 
    });
});

app.get('/compteInfo', (req, res) => {
    const email = req.query.email; // Get email from query parameters
    console.log("Email received:", email);

    const sql = "SELECT * FROM compte_login WHERE email = ?"; // Use parameterized query to prevent SQL injection
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Error fetching accounts by email:", err);
            return res.status(500).json({ message: "An error occurred while fetching accounts by email." });
        }

        if (result.length > 0) {
            return res.status(200).json({  result: result[0] });
        } else {
            return res.status(404).json({ message: "No account found for the provided email." });
        }
    });
});

app.get('/compteInfo2', (req, res) => {
    const { id, email } = req.query; // Get id and email from query parameters
    console.log("ID received:", id);
    console.log("Email received:", email);

    const sql = "SELECT * FROM compte_login WHERE id = ? AND email = ?"; // Use parameterized query to prevent SQL injection
    db.query(sql, [id, email], (err, result) => {
        if (err) {
            console.error("Error fetching account by id and email:", err);
            return res.status(500).json({ message: "An error occurred while fetching account by id and email." });
        }

        if (result.length > 0) {
            return res.status(200).json({ result: result[0] });
        } else {
            return res.status(404).json({ message: "No account found for the provided id and email." });
        }
    });
});

app.get('/get_notification_title', (req, res) => {
    const id = req.query.id; // Get ID from query parameters
    console.log("ID received:", id);

    const sql = "SELECT Titre, notification, created_at FROM notifications WHERE id_parent = ?"; // Assuming there's a column "id_parent" in the "notifications" table
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching notifications by ID:", err);
            return res.status(500).json({ message: "An error occurred while fetching notifications by ID." });
        }

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: "No notifications found for the provided ID." });
        }
    });
});






app.get('/comptes', (req, res) => {
    const roleValue = req.params.role;

    const sql = "SELECT * FROM compte_login";
    db.query(sql, [roleValue], (err, result) => {
        if (err) {
            console.error("Error fetching accounts by role:", err);
            return res.status(500).json({ message: "An error occurred while fetching accounts by role." });
        }

        if (result.length > 0) {
            return res.status(200).json({result});
        } 
    });
});


app.get('/LesProf', (req, res) => {

    const sql = "SELECT * FROM prof";
    db.query(sql,  (err, result) => {
        if (err) {
            console.error("Error fetching accounts by role:", err);
            return res.status(500).json({ message: "An error occurred while fetching accounts by role." });
        }

        if (result.length > 0) {
            return res.status(200).json({class:result});
        } 
    });
});

app.get('/listClasses', async (req, res) => {
    try {
        const jsonData = {};
        const resultLevel1 = await getClasses('1AM');
        const resultLevel2 = await getClasses('2AM');
        const resultLevel3 = await getClasses('3AM');
        const resultLevel4 = await getClasses('4AM');

        jsonData['1AM'] = resultLevel1;
        jsonData['2AM'] = resultLevel2;
        jsonData['3AM'] = resultLevel3;
        jsonData['4AM'] = resultLevel4;

        res.status(200).json(jsonData);
    } catch (error) {
        console.error('Error fetching class data:', error);
        res.status(500).json({ message: 'An error occurred while fetching class data.' });
    }
});

app.put('/listClasses/ajouterClasse', async (req, res) => {
    const { niveau, classes } = req.body;

    // إضافة القسم إلى الجدول الرئيسي
    const insertQuery = `INSERT INTO classestable (niveau, classes, nbr_musc, nbr_feme, total_nbr) 
                         VALUES (?, ?, 0, 0, 0)`;

    db.query(insertQuery, [niveau, classes], async (err, result) => {
        if (err) {
            console.error("Error while adding specific section:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }

        console.log("Specific section added successfully");

            console.log("Eleves table created successfully");

            // إنشاء جدول ${classes}_emplois
            const createEmploisTableQuery = `
                CREATE TABLE IF NOT EXISTS ${classes}_emplois (
                    jour VARCHAR(255),
                    subject1 VARCHAR(255),
                    subject2 VARCHAR(255),
                    subject3 VARCHAR(255),
                    subject4 VARCHAR(255),
                    subject5 VARCHAR(255),
                    subject6 VARCHAR(255),
                    subject7 VARCHAR(255)
                )
            `;
            db.query(createEmploisTableQuery, async (err, result) => {
                if (err) {
                    console.error("Error while creating emplois table:", err);
                    return res.status(500).json({ error: "Server error occurred" });
                }

                console.log("Emplois table created successfully");

                const sqlQueries = [
                    `INSERT INTO ${classes}_emplois (jour, subject1, subject2, subject3, subject4, subject5, subject6, subject7) VALUES ('Dimanche', '', '', '', '', '', '', '');`,
                    `INSERT INTO ${classes}_emplois (jour, subject1, subject2, subject3, subject4, subject5, subject6, subject7) VALUES ('Lundi', '', '', '', '', '', '', '');`,
                    `INSERT INTO ${classes}_emplois (jour, subject1, subject2, subject3, subject4, subject5, subject6, subject7) VALUES ('Mardi', '', '', '', '', '', '', '');`,
                    `INSERT INTO ${classes}_emplois (jour, subject1, subject2, subject3, subject4, subject5, subject6, subject7) VALUES ('Mercredi', '', '', '', '', '', '', '');`,
                    `INSERT INTO ${classes}_emplois (jour, subject1, subject2, subject3, subject4, subject5, subject6, subject7) VALUES ('Jeudi', '', '', '', '', '', '', '');`
                ];

                sqlQueries.forEach((sqlQuery) => {
                    db.query(sqlQuery, (err, result) => {
                        if (err) {
                            console.error('Error executing SQL query:', err);
                            return;
                        }
                        console.log('SQL query executed successfully');
                    });
                });

                res.status(200).json({ success: "Specific section added successfully" });
            });
    });
});
app.delete('/listClasses/supprimerClasse', async (req, res) => {
    const { classes } = req.body;

    // حذف القسم من الجدول الرئيسي
    const deleteMainQuery = `DELETE FROM classestable WHERE classes = ?`;
    db.query(deleteMainQuery, [classes], async (err, result) => {
        if (err) {
            console.error("Error while deleting specific section:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }

        // حذف البيانات المرتبطة بالقسم من جداول أخرى
        const deleteSubTablesQuery = `
            UPDATE prof
            SET classes = REPLACE(classes, ?, '')
            WHERE classes LIKE CONCAT('%', ?, '%')
        `;
        db.query(deleteSubTablesQuery, [classes, classes], async (err, result) => {
            if (err) {
                console.error("Error while updating associated tables:", err);
                return res.status(500).json({ error: "Server error occurred" });
            }

            console.log("Associated data updated successfully");

            // حذف الجداول المرتبطة
            const deleteSubTablesQuery2 = `
                DROP TABLE IF EXISTS ${classes}_emplois;
            `;
            db.query(deleteSubTablesQuery2, async (err, result) => {
                if (err) {
                    console.error("Error while deleting associated tables:", err);
                    return res.status(500).json({ error: "Server error occurred" });
                }

                console.log("Associated tables deleted successfully");
                res.status(200).json({ success: "Specific section and associated tables deleted successfully" });
            });
        });
    });
});


app.get('/emploisDeTemps/classes/:niveau', (req, res) => {
    const niveau = req.params.niveau;
    const selectQuery = `SELECT classes FROM classestable WHERE niveau = ?`;
   console.log(niveau);
    db.query(selectQuery, [niveau], (err, result) => {
        if (err) {
            console.error("Error while fetching classes:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }
         
        console.log("Classes fetched successfully");
        res.status(200).json({ classes: result });
    });
});

app.get('/emploisDeTemps/classe/:section', (req, res) => {
    const level = req.params.section;
    const selectQuery = `SELECT * FROM ${level}_emplois`;
   console.log(level);
    db.query(selectQuery, [level], (err, result) => {
        if (err) {
            console.error("Error while fetching classes:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }
         
        console.log("seccus");
        res.status(200).json({schedule: result });
    });
});

app.get('/emploisDeTemps/subjects', (req, res) => {
    const selectQuery = 'SELECT * FROM subjects'; // تأكد من أن اسم الجدول هو "Subjects"
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.error("Error while fetching subjects:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }

        console.log("Success");
        res.status(200).json({subjects: result }); // يمكنك تغيير "schedule" إلى "subjects" لتكون معقولة أكثر
    });
});




function getClasses(level) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM classestable WHERE niveau = ?";
        db.query(sql, [level], (err, result) => {
            if (err) {
                console.error('Error fetching class data:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


app.post('/emploisDeTemps/save/:classe', (req, res) => {
    const { schedule } = req.body;
    const classe = req.params.classe;
    // تحديث البيانات في جدول الجدول
    const updateQuery = `UPDATE ${classe}_emplois SET subject1=?, subject2=?, subject3=?, subject4=?, subject5=?, subject6=?, subject7=? WHERE jour=?`;
    
    // تنفيذ الاستعلام لكل يوم في الجدول
    schedule.forEach(async (item) => {
      const { subject1, subject2, subject3, subject4, subject5, subject6, subject7, jour } = item;
      db.query(updateQuery, [subject1, subject2, subject3, subject4, subject5, subject6, subject7, jour], (err, result) => {
        if (err) {
          console.error('Error updating schedule:', err);
          return res.status(500).json({ error: 'Server error occurred' });
        }
        console.log('Schedule updated successfully');
      });
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



app.post('/login', (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
    const sql = "SELECT * FROM compte_login WHERE email = ? AND password = ?";
    console.log(hashedPassword);
    db.query(sql, [req.body.email, hashedPassword], (err, result) => {
        if (err) {
            return res.json("Error login:");
        }
        if (result.length > 0) {
            req.session.userId = result[0].id;
            req.session.role = result[0].role;
            req.session.visited = true;
            req.session.success = true;
            req.session.message = 'Login successful'
            console.log("User's role:", req.session.role); 
            console.log("Session:", req.session); 
            return res.json({ 
                status: "success", 
                session: req.session, 
                result: result 
            });
        } else {
            return res.json("false");
        }
    });

});
app.post('/listClasses/ajouterEleve/:classe', (req, res) => {
    const { students } = req.body;
    const { classe } = req.params;
    const totalStudents = students.length;
    let errorOccurred = false;

    students.forEach(student => {
        const updateSql = `UPDATE eleves SET section = ? WHERE id_eleve = ?`;

        db.query(updateSql, [classe, student.id], (err, result) => {
            if (err) {
                console.error('Error updating student section:', err);
                errorOccurred = true; 
            } else {
                console.log(`Section updated for student with ID ${student.id}`);

            }
        });
    });
    const updateClassSql = `
                    UPDATE classestable
                    SET
                        nbr_musc = (SELECT COUNT(*) FROM eleves WHERE section = ? AND sexe = 'male'),
                        nbr_feme = (SELECT COUNT(*) FROM eleves WHERE section = ? AND sexe = 'femele'),
                        total_nbr = (SELECT COUNT(*) FROM eleves WHERE section = ?)
                    WHERE
                        classes = ?
                `;

                db.query(updateClassSql, [classe, classe, classe, classe], (err, result) => {
                    if (err) {
                        console.error('Error updating class students count:', err);
                        errorOccurred = true; 
                    } else {
                        console.log('Class students count updated successfully');
                    }

                    if (!errorOccurred) {
                        res.status(200).send('تم تحديث عدد التلاميذ بنجاح');
                    } else {
                        res.status(500).send('حدث خطأ أثناء تحديث عدد التلاميذ');
                    }
                });
});



app.post('/addEleve', (req, res) => {
    const userId = Math.floor(Math.random() * 100000000);
    const values = [
        userId,
        req.body.nomAr,
        req.body.nomFr,
        req.body.prenomAr,
        req.body.prenomFr,
        req.body.dateNaissance,
        req.body.wilaya,
        req.body.sexe,
        req.body.classe,
        req.body.niveau,
        null // id_parent
    ];
    
    console.log(values);

    const insertQuery = `INSERT INTO eleves (id_eleve, nom_arabe, nom_francais, prenom_arabe, prenom_francais, date_naissance, lieu_naissance, sexe, section, niveau, id_parent) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error("Error while adding student:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }
        console.log("Student added successfully");
        res.status(200).json({ success: "Student added successfully" });
    });
});


app.get('/parent/:id', (req, res) => {
    const id_parent = req.params.id;
  
    // استعلام SQL لاسترداد اسم ولقب الأب من جدول comptes_login
    const sqlQuery = `SELECT * FROM compte_login WHERE id = ?`;
  
    db.query(sqlQuery,[id_parent], (err, result) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }
        console.log("Students fetched successfully");
        res.status(200).json(result);
    });
  });
  


app.get("/Eleves", (req, res) => {
    const selectQuery = "SELECT * FROM eleves";
    console.log("eee");
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }
        console.log("Students fetched successfully");
        res.status(200).json(result);
    });
});

app.post('/eleves_Parent', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
        const activationStatus = "Activer";
        const sql = "INSERT INTO eleve_Parent (id_parent, id_eleve, nom, prenom, dateN, typeRelation, Activation) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [
        req.body.id_parent,
        req.body.id_eleve,
        req.body.nom,
        req.body.prenom,
        req.body.dateN,
        req.body.typeRelation,
        activationStatus
      ];
  
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Erreur lors de l'inscription :", err);
          return res.status(500).json({ message: "Une erreur s'est produite lors de l'inscription." });
        }
        req.session.userId = result.insertId;
        return res.status(200).json({ message: "Inscription réussie.", Session: req.session });
      });
  
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      return res.status(500).json({ message: "Une erreur s'est produite lors de l'inscription." });
    }
  });

app.get('/affich_eleves_Parent', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const sql = "SELECT * FROM eleve_Parent"; 
        db.query(sql, (err, result) => {
            if (err) {
                console.error("Erreur lors de la récupération des élèves :", err);
                return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des élèves." });
            }
            return res.status(200).json({ eleves: result });
        });

    } catch (err) {
        console.error("Erreur lors de la récupération des élèves :", err);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des élèves." });
    }
});

app.get('/affich_eleves_Parent_conform', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const sql = "SELECT * FROM eleves_parent_conforme"; 
        db.query(sql, (err, result) => {
            if (err) {
                console.error("Erreur lors de la récupération des élèves :", err);
                return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des élèves." });
            }
            return res.status(200).json({ eleves: result });
        });

    } catch (err) {
        console.error("Erreur lors de la récupération des élèves :", err);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des élèves." });
    }
});

// Route to get a student by ID (if needed)
app.get('/eleves/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM eleve_Parent WHERE id_eleve = ?';
    
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération de l\'élève:', err);
        return res.status(500).send('Erreur lors de la récupération de l\'élève');
      }
      
      if (results.length === 0) {
        return res.status(404).send('Élève non trouvé');
      }
      
      res.json(results[0]);
    });
  });
  

// Route pour accepter un élève (ajouter à la table conforme et supprimer de la table parent)
app.post('/eleves_parent_conforme', (req, res) => {
    const { id_eleve } = req.body;
  
    // Démarrer une transaction
    db.beginTransaction(err => {
      if (err) {
        return res.status(500).send('Erreur lors du démarrage de la transaction');
      }
  
      // Récupérer l'élève de la table parent
      const selectQuery = 'SELECT * FROM eleve_Parent WHERE id_eleve = ?';
      db.query(selectQuery, [id_eleve], (selectError, results) => {
        if (selectError) {
          return db.rollback(() => {
            console.error('Erreur lors de la récupération de l\'élève:', selectError);
            res.status(500).send('Erreur lors de la récupération de l\'élève');
          });
        }
  
        if (results.length === 0) {
          return db.rollback(() => {
            console.error('Élève non trouvé');
            res.status(404).send('Élève non trouvé');
          });
        }
  
        const student = results[0];
  
        const activationStatus = "Activer";

        // Insérer l'élève dans la table conforme
        const insertQuery = 'INSERT INTO eleves_parent_conforme (id_eleve, nom, prenom, id_parent, dateN, typeRelation) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [student.id_eleve, student.nom, student.prenom, student.id_parent, student.dateN, student.typeRelation, activationStatus], (insertError) => {
          if (insertError) {
            return db.rollback(() => {
              console.error('Erreur lors de l\'ajout de l\'élève conforme:', insertError);
              res.status(500).send('Erreur lors de l\'ajout de l\'élève conforme');
            });
          }
  
          // Supprimer l'élève de la table parent
          const deleteQuery = 'DELETE FROM eleve_Parent WHERE id_eleve = ?';
          db.query(deleteQuery, [student.id_eleve], (deleteError) => {
            if (deleteError) {
              return db.rollback(() => {
                console.error('Erreur lors de la suppression de l\'élève:', deleteError);
                res.status(500).send('Erreur lors de la suppression de l\'élève');
              });
            }
  
            // Valider la transaction
            db.commit(commitError => {
              if (commitError) {
                return db.rollback(() => {
                  console.error('Erreur lors de la validation de la transaction:', commitError);
                  res.status(500).send('Erreur lors de la validation de la transaction');
                });
              }
  
              res.sendStatus(200);
            });
          });
        });
      });
    });
  });
  
 // Route POST pour ajouter un nouveau module
/*app.post('/modules', [
    check('module').not().isEmpty().withMessage('Le champ module est requis'),
    check('prof_module').not().isEmpty().withMessage('Le champ prof_module est requis'),
    check('email_prof').isEmail().withMessage('Le champ email_prof doit être un email valide'),
    check('note_module').isNumeric().withMessage('Le champ note_module doit être un nombre'),
    check('semestre').not().isEmpty().withMessage('Le champ semestre est requis')
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    const { module, prof_module, email_prof, note_module, semestre } = req.body;
  
    // Requête SQL pour insérer les données dans la table modules
    const sql = 'INSERT INTO modules (module, prof_module, email_prof, note_module, semestre) VALUES (?, ?, ?, ?, ?)';
    const values = [module, prof_module, email_prof, note_module, semestre];
  
    // Exécution de la requête SQL
    db.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de l\'insertion dans la table modules : ' + error.message);
        res.status(500).send('Erreur lors de l\'insertion dans la table modules');
        return;
      }
      console.log('Nouvelle entrée insérée dans la table modules avec l\'ID ' + results.insertId);
      res.status(200).send('Nouvelle entrée insérée dans la table modules');
    });
  });


// Route POST pour insérer des notes dans la table notes_eleve
/*app.post('/insert-notes', (req, res) => {
    // Extraire les données requises du corps de la requête
    const { id_eleve, module, note_module } = req.body;

    // Vérifier si toutes les données requises sont fournies
    if (!id_eleve || !module || !note_module) {
        return res.status(400).json({ error: 'id_eleve, module, and note are required' });
    }

    // Requête SQL pour insérer les données dans la table de modules
    const sql = 'UPDATE modules SET note_module = ? WHERE id_eleve IN (SELECT id_eleve FROM eleves_parent_conforme WHERE id_eleve = ?) AND module = ?';
    const values = [note_module, id_eleve, module];


    // Exécution de la requête SQL
    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Erreur lors de la mise à jour de la note dans la table de modules : ' + error.message);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de la note dans la table de modules' });
        }
        console.log('Note mise à jour dans la table de modules pour l\'élève avec l\'ID ' + id_eleve);
        res.status(200).json({ message: 'Note mise à jour dans la table de modules' });
    });
});*/

/*app.post('/insert-notes', (req, res) => {
    // Extraire les données requises du corps de la requête
    const { id_eleve, module, note } = req.body;

    // Vérifier si toutes les données requises sont fournies
    if (!id_eleve || !module || !note) {
        return res.status(400).json({ error: 'id_eleve, module, and note are required' });
    }

    // Requête SQL pour insérer les données dans la table notes_modules
    const sql = 'INSERT INTO notes_modules (id_eleve, module, note) VALUES (?, ?, ?)';
    const values = [id_eleve, module, note];

    // Exécution de la requête SQL
    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'insertion dans la table notes_modules : ' + error.message);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion dans la table notes_modules' });
        }
        console.log('Nouvelle entrée insérée dans la table notes_modules avec l\'ID ' + results.insertId);
        res.status(200).json({ message: 'Nouvelle entrée insérée dans la table notes_modules' });
    });
});*/

app.get('/notes', (req, res) => {
    const { id_eleve, module, semestre } = req.query;

    if (!id_eleve || !module || !semestre) {
        return res.status(400).json({ error: 'id_eleve, modules, and semestre are required' });
    }

    const sql = 'SELECT interro1, interro2, control FROM note_modules WHERE id_eleve = ? AND modules = ? AND semestre = ?';
    const values = [id_eleve, module, semestre];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des notes :', error);
            return res.status(500).json({ error: 'Erreur lors de la récupération des notes' });
        }
        res.status(200).json(results);
    });
});



app.get('/getAllProfessorsByClass/:id_eleve', (req, res) => {
    const id_eleve = req.params.id_eleve;

    // Requête SQL pour obtenir la classe de l'élève
    const getClassQuery = `SELECT section FROM eleves WHERE id_eleve = ${id_eleve}`;

    db.query(getClassQuery, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la récupération de la classe de l\'élève' });
            return;
        }

        // Vérifier si l'élève existe
        if (results.length === 0) {
            res.status(404).json({ error: 'L\'élève avec cet ID n\'existe pas' });
            return;
        }

        const classe = results[0].section;

        // Requête SQL pour récupérer tous les professeurs enseignant dans cette classe pour toutes les matières
        const getAllProfessorsQuery = `SELECT id_prof, nom_francais, prenom_francais, matiere FROM prof WHERE FIND_IN_SET('${classe}', classes)`;

        db.query(getAllProfessorsQuery, (err, professors) => {
            if (err) {
                res.status(500).json({ error: 'Erreur lors de la récupération des professeurs' });
                return;
            }

            // Vérifier si des professeurs ont été trouvés
            if (professors.length === 0) {
                res.status(404).json({ error: 'Aucun professeur trouvé pour cette classe' });
                return;
            }

            // Promesses pour récupérer les e-mails des professeurs
            const getEmailPromises = professors.map(professor => {
                return new Promise((resolve, reject) => {
                    const id_prof = professor.id_prof;
                    // Requête SQL pour récupérer l'e-mail du professeur à partir de la table compte_login
                    const getEmailQuery = `SELECT email FROM compte_login WHERE id = ${id_prof}`;
                    db.query(getEmailQuery, (err, emailResult) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ ...professor, email: emailResult[0].email });
                        }
                    });
                });
            });

            // Attendre que toutes les promesses se terminent
            Promise.all(getEmailPromises)
                .then(professorsWithEmails => {
                    // Envoyer la réponse avec la classe de l'élève et les professeurs
                    res.json({
                        classe: classe,
                        professeurs: professorsWithEmails
                    });
                })
                .catch(err => {
                    res.status(500).json({ error: 'Erreur lors de la récupération des e-mails des professeurs' });
                });
        });
    });
});













// Route GET pour afficher les modules par id_eleve
app.get('/affich_modules/:id_eleve', (req, res) => {
    const { id_eleve } = req.params;

    try {
        const sql = "SELECT semestre, modules FROM note_modules WHERE id_eleve = ?"; 
        db.query(sql, [id_eleve], (err, result) => {
            if (err) {
                console.error("Erreur lors de la récupération des modules pour l'élève", id_eleve, ":", err);
                return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des modules." });
            }

            // Organiser les résultats par semestre
            const modulesParSemestre = result.reduce((acc, curr) => {
                const { semestre, modules } = curr;
                if (!acc[semestre]) {
                    acc[semestre] = [];
                }
                acc[semestre].push({ module: modules });
                return acc;
            }, {});

            return res.status(200).json(modulesParSemestre);
        });

    } catch (err) {
        console.error("Erreur lors de la récupération des modules pour l'élève", id_eleve, ":", err);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des modules." });
    }
});


app.post('/accept_eleve/:id', (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE eleve_Parent SET activation = true WHERE id_eleve = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'acceptation de l'élève :", err);
        return res.status(500).json({ message: "Une erreur s'est produite lors de l'acceptation de l'élève." });
      }
      return res.status(200).json({ message: "Élève accepté avec succès." });
    });
  });
  
  app.delete('/delete_eleve/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM eleve_Parent WHERE id_eleve = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression de l'élève :", err);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'élève." });
      }
      return res.status(200).json({ message: "Élève supprimé avec succès." });
    });
  });



app.get("/Liste", (req, res) => {
    const selectQuery = "SELECT * FROM eleves";
    console.log("eee");
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }
        console.log("Students fetched successfully");
        res.status(200).json(result);
    });
});


app.get("/Liste/:niveau", (req, res) => {
    const niveau = req.params.niveau;
    const selectQuery = "SELECT * FROM eleves WHERE niveau = ?";
    console.log("eee");
    db.query(selectQuery, [niveau], (err, result) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }
        console.log("Students fetched successfully");
        res.status(200).json(result);
    });
});



app.get("/emploisDeTemps", (req, res) => {
    const selectQuery = "SELECT * FROM classestable";
    console.log("eee");
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }
        console.log("Students fetched successfully");
        res.status(200).json(result);
    });
});
app.post("/lesprof/:classe", (req, res) => {
    const classe = req.params.classe;
    const profs = req.body.profs;
    profs.forEach(id_prof => {
    const sqlMatiereQuery = `
        SELECT matiere
        FROM prof
        WHERE id_prof = ? AND classes NOT LIKE ?
    `;

    db.query(sqlMatiereQuery, [id_prof, `%${classe}%`], (err, matiereResult) => {
        if (err) {
            res.status(500).send("حدث خطأ في قاعدة البيانات");
        } else {
            const matiere = matiereResult[0].matiere;

            const sqlQuery = `
                SELECT *
                FROM prof
                WHERE matiere = ? AND classes LIKE CONCAT('%', ?, '%')
            `;

            db.query(sqlQuery, [matiere, classe], (err, results) => {
                if (err) {
                    res.status(500).send("حدث خطأ في قاعدة البيانات");
                } else {
                    res.json(results);

                }
            });
            
                    const updateClassesQuery = `
                        UPDATE prof
                        SET classes = REPLACE(classes, ?, '')
                        WHERE matiere = ? AND classes LIKE CONCAT('%', ?, '%')
                    `;

                    db.query(updateClassesQuery, [classe, matiere, classe], (err, updateResult) => {
                        if (err) {
                            console.log("حدث خطأ في تحديث العمود classes");
                        } else {
                            console.log("تم تحديث العمود classes بنجاح");

                            const addClassQuery = `
                                UPDATE prof
                                SET classes = CONCAT(classes, ?)
                                WHERE id_prof = ?
                            `;

                            db.query(addClassQuery, [` ${classe}`, id_prof], (err, addClassResult) => {
                                if (err) {
                                    console.log("حدث خطأ في إضافة كلمة 'class' إلى العمود classes");
                                } else {
                                    console.log("تمت إضافة كلمة 'class' بنجاح إلى العمود classes");
                                }
                            });
                        }
                    });
        }
    });
});
});

app.delete('/deleteAnnonce/:id', (req, res) => {
    const annonceId = req.params.id;
  
    const deleteQuery = `DELETE FROM annonces WHERE id = ?`;
    db.query(deleteQuery, [annonceId], (err, result) => {
      if (err) {
        console.error("Error deleting annonce:", err);
        return res.status(500).json({ message: "An error occurred while deleting the annonce." });
      }
      return res.status(200).json({ message: "Annonce deleted successfully." });
    });
  });

  app.get('/api/eleves-parents', (req, res) => {
    const query = `
      SELECT 
        eleves.id_eleve, 
        eleves.nom_arabe AS nomeleve, 
        eleves.prenom_arabe AS prenomeleve, 
        eleves.id_parent, 
        compte_login.nomAr AS nomparent, 
        compte_login.prenomAr AS premonparent, 
        compte_login.email AS emailparent 
      FROM eleves 
      LEFT JOIN compte_login 
      ON eleves.id_parent = compte_login.id`;
  
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });


















 
/*il ya in pointeleves et eleveEnseignat  ==> work */
app.get('/compte_loginn', (req, res) => {
    const email = req.query.email;
    if (!email) {
      return res.status(400).send({ error: 'Email is required' });
    }
  
    const query = 'SELECT id FROM compte_login WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        return res.status(500).send({ error: 'Database query failed' });
      }
      res.send(results);
    });
  });
  
  
  /*il ya in eleveEnseignat ==> work */
  app.get('/proff_details', (req, res) => {
    const accountId = req.query.accountId;
    if (!accountId) {
      return res.status(400).send({ error: 'Account ID is required' });
    }
  
    const query = 'SELECT classes FROM prof WHERE id_prof = ?';
    db.query(query, [accountId], (error, results) => {
      if (error) {
        return res.status(500).send({ error: 'Database query failed' });
      }
      res.send(results);
    });
  });

  app.get("/studentsss", (req, res) => {
    const sql = 'SELECT * FROM note_modules';
    console.log("read");
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching students:', err);
        res.status(500).send({ error: 'An error occurred while fetching students.' });
      } else {
        
        res.status(200).json(result);
      }
    });
  });
  /* il ya in eleveEnseignat ==> work*/
  app.get("/Listee", (req, res) => {
    const selectQuery = "SELECT * FROM eleves";
    console.log("eee");
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }
        console.log("Students fetched successfully");
        res.status(200).json(result);
    });
  });
  /* il ya in eleveEnseignat ==> work*/
  app.get('/emploisDeTempss/classess/:niveau', (req, res) => {
    const niveau = req.params.niveau;
    const selectQuery = `SELECT classes FROM classestable WHERE niveau = ?`;
   console.log(niveau);
    db.query(selectQuery, [niveau], (err, result) => {
        if (err) {
            console.error("Error while fetching classes:", err);
            return res.status(500).json({ error: "Server error occurred" });
        }
         
        console.log("Classes fetched successfully");
        res.status(200).json({ classes: result });
    });
});

/*il ya in pointeleves ==> work*/

app.get('/profff/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT classes FROM prof WHERE id_prof = ?';
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Error fetching teacher classes:', err);
        res.status(500).send({ error: 'An error occurred while fetching teacher classes.' });
      } else {
        res.send(result[0]);
      }
    });
  });
  
  /*il ya in pointeleves ==> work*/
  
  /************************************************************** */
  app.get('/prof_detailss', (req, res) => {
    const accountId = req.query.accountId;
    const sql = 'SELECT matiere FROM prof WHERE id_prof = ?';
    db.query(sql, [accountId], (err, result) => {
      if (err) {
        console.error('Error fetching professor details:', err);
        res.status(500).send({ error: 'An error occurred while fetching professor details.' });
      } else {
        res.send(result[0]);
      }
    });
  });


  app.get('/matiere/:id', (req, res) => {
    const idmpersone = req.params.id;
    const query = 'SELECT studentes FROM prof WHERE id_prof = ?';
  
    db.query(query, [idmpersone], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server error');
        return;
      }
      if (results.length > 0) {
        res.json({ matiere: results[0].matiere });
      } else {
        res.status(404).send('Not found');
      }
    });
  });
  
  // Route pour mettre à jour les notes d'un étudiant
  
  app.post('/updateStudent/:id', (req, res) => {
    const id = req.params.id;
    const { interro1, interro2, control } = req.body;
    const query = 'UPDATE note_modules SET interro1 = ?, interro2 = ?, control = ? WHERE id = ?';
    db.query(query, [interro1, interro2, control, id], (error, results) => {
      if (error) {
        console.error('Error updating student data:', error);
        res.status(500).send('Error updating student data');
      } else {
        res.send('Student data updated successfully');
      }
    });
});



























  app.put('/editAnnonce', (req, res) => {
    const annonceId = req.body.id;
    const { titre, date_publication, contenu, image } = req.body;
  
    const updateQuery = `UPDATE annonces SET titre = ?, date_publication = ?, contenu = ?, image = ? WHERE id = ?`;
    console.log(titre);
    db.query(updateQuery, [titre, date_publication, contenu, image, annonceId], (err, result) => {
      if (err) {
        console.error("Error updating annonce:", err);
        return res.status(500).json({ message: "An error occurred while updating the annonce." });
      }
      return res.status(200).json({ message: "Annonce updated successfully." });
    });
  });
  
  

app.get('/getAnonnce',async(req,res)=>{
    
    const selectQuery = `SELECT * FROM  annonces`;
    
    db.query(selectQuery,(err, result) => {
        if (err) {
            console.error("Error signing up:", err);
            return res.status(500).json({ message: "An error ." });
        }
        
        return res.status(200).json({result});
    });
    
})
app.put('/putAnonnce', upload.single('image'), async (req, res) => {
    const { title, date, text, } = req.body;
    const imageUrl = req.file ? req.file.path : ''; // Get the uploaded file path
  
    const values = [title, date, text, imageUrl];
    const insertQuery = `INSERT INTO annonces (titre, date_publication, contenu, image) VALUES (?)`;
  
    db.query(insertQuery, [values], (err, result) => {
      if (err) {
        console.error("Error signing up:", err);
        return res.status(500).json({ message: "An error occurred." });
      }
      
      return res.status(200).json({ message: "Insert successful." });
    });
  });
  
app.put('/demandes/acceptRequest', async (req, res) => {
    try {
        const { id, telph, email, password, nomAr, nomFr, prenomFr, prenomAr, dateN, sex, role, idProfessionnelle, adresse, Wilaya, school, poste } = req.body;
        const empty="";
        const insertQuery = `INSERT INTO compte_login (id, telph, email, password, nomAr, nomFr, prenomFr, prenomAr, dateN, sex, role, idProfessionnelle, adresse, Wilaya, school, poste) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const insertQuery2 = `INSERT INTO prof (id_prof,classes,
            nom_arabe,	
            nom_francais,	
            prenom_arabe	,
            prenom_francais,	
            date_naissance,	
            lieu_naissance,	
            matiere	,
            sexe	) VALUES (?, ?,?,?,?,?,?,?,?,?) `;


        const insertValues = [id, telph, email, password, nomAr, nomFr, prenomFr, prenomAr, dateN, sex, role, idProfessionnelle, adresse, Wilaya, school, poste];

        await db.query(insertQuery, insertValues);
        if(role===2){
        await db.query(insertQuery2, [id,empty,nomAr,nomFr, prenomFr, prenomAr, dateN,, empty, sex]);
        }

        const deleteQuery = `DELETE FROM comptes_signup WHERE id = ?`;
        await db.query(deleteQuery, [id]);

        res.status(200).send('Request accepted and transferred');
    } catch (error) {
        console.error('Error accepting request:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.delete('/demandes/rejectRequest', async (req, res) => {
    console.log("eee");
    try {
        const { id } = req.body; // استخراج id من req.body
        console.log(id);

        const deleteQuery = `DELETE FROM comptes_signup WHERE id = ?`;
        await db.query(deleteQuery, [id]); // تمرير id كوسيطة واحدة في الاستعلام DELETE

        res.status(200).send('Request rejected and account deleted');
    } catch (error) {
        console.error('Error rejecting request:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.delete('/Eleves/deleteRequest', async (req, res) => {
    console.log("eee");
    try {
        const  id  = req.body.id_eleve; // استخراج id من req.body
        console.log("eee",id);

        const deleteQuery = `DELETE FROM eleves WHERE id_eleve = ?`;
        await db.query(deleteQuery, [id]); // تمرير id كوسيطة واحدة في الاستعلام DELETE

        res.status(200).send('Request rejected and account deleted');
    } catch (error) {
        console.error('Error rejecting request:', error);
        res.status(500).send('Internal Server Error');
    }
});





app.post('/signup', (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const userId = Math.floor(Math.random() * 100000000);
        const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
        const sql = "INSERT INTO comptes_signup (id,telph, email, password, nomAr, nomFr, prenomAr, prenomFr, sex, dateN, role,idProfessionnelle,Wilaya,school,poste,adresse) VALUES (?)";
        const values = [
            userId,
            req.body.phoneNumber,
            req.body.email,
            hashedPassword,
            req.body.nomAr,
            req.body.nomFr,
            req.body.prenomAr,
            req.body.prenomFr,
            req.body.sexe,
            req.body.dateN,
            req.body.role,
            req.body.idProfessionnelle,
            req.body.Wilaya,
            req.body.school, 
            req.body.poste,
            req.body.adresse
                ];

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Error signing up:", err);
                return res.status(500).json({ message: "An error occurred while signing up." });
            }
            req.session.userId = userId;
            req.session.role = req.body.role;
            return res.status(200).json({ message: "User signed up successfully.", Session : req.session });
        });
    } catch (err) {
        console.error("Error signing up:", err);
        return res.status(500).json({ message: "An error occurred while signing up." });
    }
});

/*app.post('/signupRole', (req, res) => {
    if (!req.session.userId) {
        return res.status(400).json({ Message: "Not authenticated" });
    }

    const currentID = req.body.userCurrentID;

    const queryRole = "SELECT role FROM signTable WHERE id = ?";
    db.query(queryRole, [currentID], (err, result) => {
        if (err) {
            console.error("Error getting user role:", err);
            return res.status(500).json({ message: "An error occurred while fetching user role." });
        }

        if (result.length > 0) {
            const role = result[0].role;

            let queryInsert, valuesInsert;

            switch (role) {
                case 1:
                    queryInsert = "INSERT INTO admininof (id, NumeroD, wilaya, Etablis, Poste) VALUES (?, ?, ?, ?, ?)";
                    valuesInsert = [currentID, req.body.NumeroD, req.body.wilaya, req.body.Etablis, req.body.Poste];
                    break;
                case 2:
                    queryInsert = "INSERT INTO enseignat (id, NumeroD, wilaya, Etablis, schoolName, Poste) VALUES (?, ?, ?, ?, ?, ?)";
                    valuesInsert = [currentID, req.body.NumeroD, req.body.wilaya, req.body.Etablis, req.body.schoolName, req.body.Poste];
                    break;
                case 3:
                    queryInsert = "INSERT INTO parent (id, NumeroD, wilaya, Etablis, Adresse) VALUES (?, ?, ?, ?, ?)";
                    valuesInsert = [currentID, req.body.NumeroD, req.body.wilaya, req.body.Etablis, req.body.Adresse];
                    break;
                default:
                    return res.status(400).json({ Message: "Invalid user role" });
            }

            db.query(queryInsert, valuesInsert, (err, result) => {
                if (err) {
                    console.error("Error inserting user data:", err);
                    return res.status(500).json({ message: "An error occurred while inserting user data." });
                }
                console.log("User data inserted successfully.");
                return res.status(200).json({ message: "User data inserted successfully." });
            });
        } else {
            return res.status(401).json({ Message: "Invalid credentials" });
        }
    });
});*/
/*
// Middleware pour vérifier si l'utilisateur est connecté
function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
    next(); // Passe à la prochaine étape du traitement des requêtes
}

// Route pour terminer la session de connexion
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: "An error occurred while logging out." });
        }
        res.redirect('/login'); // Redirige vers la page de connexion après la déconnexion
    });
});

// Route pour récupérer l'userId
app.post('/getUserId', requireLogin, (req, res) => {
    // Vérifiez d'abord si le rôle de l'utilisateur est égal à 3
    if (req.session.role !== 3) {
        return res.status(403).json({ message: "Access denied. User's role is not 3." });
    }

    // Récupérer l'userId de la session
    const userId = req.session.userId;

    // Si userId n'existe pas dans la session, renvoyer une erreur
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized. User not logged in." });
    }

    // Si l'utilisateur est authentifié et que son rôle est égal à 3, renvoyer l'userId
    return res.status(200).json({ userId: userId });
});
*/



app.put("/notifications/:id",(req,res)=>{
    const { message } = req.body;

    const id = req.params.id;
    const insertQuery = `UPDATE notifications SET notification = ? WHERE id = ?`;

    db.query(insertQuery, [message, id], (err, result) => {
        if (err) {
            console.error("Error updating :", err);
            return res.status(500).json({ message: "An error occurred." });
        }

        return res.status(200).json({message: "Insert successful"});
    });
})

app.delete("/notificationsSupp/:id", (req, res) => {
    const id = req.params.id;

    const deleteQuery = `DELETE FROM notifications WHERE id = ?`;

    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error("Error deleting notification:", err);
            return res.status(500).json({ message: "An error occurred." });
        }

        return res.status(200).json({ message: "Delete successful" });
    });
});

app.get('/notifications',(req,res)=>{
    const sql = " SELECT * FROM notifications  ORDER BY created_at DESC";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching :", err);
            return res.status(500).json({ message: "An error occurred while fetching ." });
        }

        if (result.length > 0) {
            return res.status(200).json({notifications:result});
        } 
    });
})

app.put('/editProf/:id', (req, res) => {
    const profId = req.params.id;
    const { jour, heure } = req.body; 
    console.log(jour);
    const disp = `${jour} ${heure}`; 
    console.log(disp);
    const updateQuery = `UPDATE prof SET disponible = ? WHERE id_prof = ?`;
    db.query(updateQuery, [disp, profId], (err, result) => {
        if (err) {
            console.error("Error updating prof:", err);
            return res.status(500).json({ message: "An error occurred while updating the prof." });
        }
        return res.status(200).json({ message: "Prof updated successfully." });
    });
});
app.post("/SendAbsenceReport", (req, res) => {
    const report = req.body.report;

    // Define the message (assuming it's a constant message; adjust as needed)
    const message = 'Your child was absent today. Please check the details.';

    // Construct your SQL select query
    const selectQuery = `
      SELECT email FROM compte_login WHERE id = ?
    `;

    // Construct your SQL insert query
    const insertQuery = `
      INSERT INTO notifications (id_parent, notification, created_at)
      VALUES (?, ?, NOW())
    `;

    // Array to store promises
    const promises = report.map(item => {
        return new Promise((resolve, reject) => {
            db.query(selectQuery, [item.id_parent], (err, result) => {
                if (err) {
                    console.error('Error retrieving email:', err);
                    reject('An error occurred while retrieving email.');
                } else {
                    if (result.length > 0) {
                        const email = result[0].email;

                        db.query(insertQuery, [item.id_parent, item.message], (err, result) => {
                            if (err) {
                                console.error('Error inserting data:', err);
                                reject('An error occurred while inserting data.');
                            } else {
                                console.log('Data inserted successfully:', result);

                                const mailOptions = {
                                    from: 'madrassaty.platform@gmail.com',
                                    to: email,
                                    subject: 'Rapport d\'absence',
                                    text: `${item.message}`
                                };

                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        console.error('Error sending email:', error);
                                        reject('Error sending email');
                                    } else {
                                        console.log('Email sent:', info.response);
                                        resolve('Data inserted and email sent successfully!');
                                    }
                                });
                            }
                        });
                    } else {
                        reject('Parent email not found.');
                    }
                }
            });
        });
    });

    // Execute all promises
    Promise.all(promises)
        .then(results => {
            res.status(200).send({ message: 'All notifications processed successfully!', results });
        })
        .catch(error => {
            res.status(500).send({ error });
        });
});

/*app.get("/notifications", (req, res) => {
    // Assuming you have a database connection named 'db'
    const db = req.db;

    // SQL query to select data from the notifications table
    const selectQuery = `SELECT * FROM notifications`;

    // Execute the query
    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error fetching notifications:', err);
            // Send an error response if there's an error fetching data
            res.status(500).send("Error fetching notifications");
        } else {
            // Send the fetched data as a JSON response
            res.status(200).json(results);
        }
    });
});*/



app.get("/notificationsParent/:id", (req, res) => {
    // Assuming you have a database connection named 'db'
   /* const db = req.db;

    // Extract id_parent from query parameters
    const idParent = req.query.id_parent;

    // Check if id_parent is provided
    if (!idParent) {
        return res.status(400).send("id_parent is required");
    }*/
   const idParent=req.params.id;
    // SQL query to select data from the notifications table filtered by id_parent
    const selectQuery = `SELECT * FROM notifications WHERE id_parent = ?`;

    // Execute the query
    db.query(selectQuery, [idParent], (err, results) => {
        if (err) {
            console.error('Error fetching notifications:', err);
            // Send an error response if there's an error fetching data
            res.status(500).send("Error fetching notifications");
        } else {
            // Send the fetched data as a JSON response
            res.status(200).json(results);
        }
    });
});



app.post('/transfert', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const sql = "INSERT INTO transfert (id,nom, prenom, ecolePrecedente, ecoleActuelle, raison) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [
            req.body.id,
            req.body.nom,
            req.body.prenom,
            req.body.ecolePrecedente,
            req.body.ecoleActuelle,
            req.body.raison
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Erreur lors de l'ajout de données à la table transfert :", err);
                return res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de données à la table transfert." });
            }
            return res.status(200).json({ message: "Données ajoutées avec succès à la table transfert." });
        });
    } catch (err) {
        console.error("Erreur lors de l'ajout de données à la table transfert :", err);
        return res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de données à la table transfert." });
    }
});

app.post('/transfert_affich', (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const sql = "SELECT * FROM transfert"; 
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des demandes de transfert :", err);
            return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des demandes de transfert." });
        }
        return res.status(200).json({ demandes: result }); 
    });
});


/*app.get('/visitor-info', (req, res) => {
    // Replace the following with your database query or logic to get visitor info
    const visitorInfo = {
        nom: 'Ilyas',
        prenom: 'Madoui',
        wilaya: 'Biskra',
        dateNaissance: '09/09/2002',
        sexe: 'Male',
        identification: '55677234',
        email: 'ilyasmadoui@gmail.com',
        telephone: '09323923232',
        adresse: 'Biskra centre'
    };
    res.json(visitorInfo);
});*/

/*app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM compte_login WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        if (result.length > 0) {
            req.session.user = result[0]; // Store user information in session
            return res.json({ success: true, user: result[0] });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.get('/visitor-info', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});*/



/*app.use(bodyParser.json());

// Endpoint to fetch messages
app.get('/api/messages', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Endpoint to send message
app.post('/api/messages', (req, res) => {
  const { text, sender, email, fileURL } = req.body;
  connection.query('INSERT INTO messages (text, sender, email, fileURL) VALUES (?, ?, ?, ?)',
    [text, sender, email, fileURL],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).send('Message sent successfully');
    });
});

// Endpoint to delete message
app.delete('/api/messages/:id', (req, res) => {
  const messageId = req.params.id;
  connection.query('DELETE FROM messages WHERE id = ?', [messageId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.send('Message deleted successfully');
  });
});

*/
app.get('/nombreComptes', (req, res) => {
    const sql = 'SELECT role, COUNT(*) as count FROM compte_login GROUP BY role';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send(err);
        return;
      }
      res.json(results);
    });
  });

app.get('/nombreEleves', (req, res) => {
    const sql = 'SELECT niveau, COUNT(*) as count FROM eleves GROUP BY niveau';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête:', err);
        res.status(500).send(err);
        return;
      }
      res.json(results);
    });
  });

  app.get('/moyennes',(req,res) => {
    const sql ='SELECT moyenne, COUNT(*) as count FROM moyennes GROUP BY moyenne';
    db.query(sql,(err,results)=>{
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête:', err);
            res.status(500).send(err);
            return;
          }
          res.json(results);
    }
    )
  }
  );

  app.get('/sexeEleves',(req,res) => {
    const sql ='SELECT sexe, COUNT(*) as count FROM eleves GROUP BY sexe';
    db.query(sql,(err,results)=>{
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête:', err);
            res.status(500).send(err);
            return;
          }
          res.json(results);
    }
    )
  }

  );


/*
function authenticateRole(role) {
    return (req, res, next) => {
        if (!req.session || !req.session.userId || req.session.role !== role) {
            return res.status(402).json({ Message: 'Not authenticated or authorized' });
        }
        next();
    };
}

app.post("/AdminPage", authenticateRole(1), (req, res) => {
    return res.status(200).json({ Message: 'Hello Admin' });
});

app.post("/ParentPage", authenticateRole(3), (req, res) => {
    return res.status(200).json({ Message: 'Hello Parent' });
});

app.post("/EnsegninetPage", authenticateRole(2), (req, res) => {
    return res.status(200).json({ Message: 'Hello Ensegninet' });
});*/

app.listen(5000, () => {
    console.log("listening on port 5000");
});
