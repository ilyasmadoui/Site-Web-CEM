import React from 'react';
import '../Design.css';
const StudentDetails = ({ student, onClose }) => {
  return (
    <div className='student-details'>
      <h2>تفاصيل التلميذ</h2>
      <button onClick={onClose}>إغلاق</button>
      <p>الاسم: {student.nom_arabe}</p>
      <p>العمر: {student.age}</p>
      {/* إضافة المزيد من التفاصيل حسب الحاجة */}
    </div>
  );
};

export default StudentDetails;
