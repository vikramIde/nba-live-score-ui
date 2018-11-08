const participantData = [{
  $class: 'org.example.iqvia.IQVIA',
  // dob: '',
  // maritalStatus: '',
  // sex: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  address: {
    $class: 'org.example.iqvia.Address',
    country: '',
    city: '',
    address: '',
    mobile: '',
    zip: ''
  }
},
{
  $class: 'org.example.iqvia.Doctor',
  dob: '',
  maritalStatus: '',
  sex: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  address: {
    $class: 'org.example.iqvia.Address',
    country: '',
    city: '',
    address: '',
    mobile: '',
    zip: ''
  }
},
{
  $class: 'org.example.iqvia.Charity',
  transferBalance: 0,
  email: '',
  accountBalance: 0,
  firstName: '',
  lastName: '',
  password: '',
  address: {
    $class: 'org.example.iqvia.Address',
    country: '',
    city: '',
    address: '',
    mobile: '',
    zip: ''
  }
},
{
  $class: 'org.example.iqvia.Patient',
  patientInsurance: {
    $class: 'org.example.iqvia.InsuranceStatus',
    InsuranceStatus: 'false',
    InsuranceClaimPercentage: '0',
    InsuranceCompanyName: '',
    InsuranceFile: ''
  },
  dob: '',
  maritalStatus: '',
  sex: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  address: {
    $class: 'org.example.iqvia.Address',
    country: '',
    city: '',
    address: '',
    mobile: '',
    zip: ''
  }
},
{
  $class: 'org.example.iqvia.Pharma',
  accountBalance: 0,
  // dob: '',
  // maritalStatus: '',
  // sex: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  address: {
    $class: 'org.example.iqvia.Address',
    country: '',
    city: '',
    address: '',
    mobile: '',
    zip: ''
  }
}]

const medicineData = {
  '$class': 'org.example.iqvia.Medicine',
  'MedId': '0185',
  'pharma': 'resource:org.example.iqvia.Pharma#1407',
  'MedName': '',
  'MedDescription': '',
  'MedPrice': 0
}

const iqviaSignatureData = {
  '$class': 'org.example.iqvia.SignIqviaPrescription',
  'iqviaDocAsset': 'org.example.iqvia.IQVIADoctorNotification#',
  'moneyPatientWanted': 0
}

export { medicineData, participantData, iqviaSignatureData }
