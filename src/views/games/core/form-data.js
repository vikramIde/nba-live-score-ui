
const prescriptionData = {
  '$class': 'org.example.iqvia.AddDoctorPrescription',
  'user': 'resource:org.example.iqvia.Patient#',
  'doctor': 'resource:org.example.iqvia.Doctor#',
  'medUsed': [],
  'TransferStatus': 'INIT',
  'comments': 'string'
}

const patientSignatureData = {
  '$class': 'org.example.iqvia.SignPatientPrescription',
  'patAsset': 'resource:org.example.iqvia.PatientNotification#'
}

const doctorSignatureData = {
  '$class': 'org.example.iqvia.SignDoctorPrescription',
  'docAsset': 'resource:org.example.iqvia.DoctorPrescription#'
}

export { prescriptionData, patientSignatureData, doctorSignatureData }
