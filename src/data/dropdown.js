export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

export const flavourOptions = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
  { value: 'chocolate', label: 'Chocolate', rating: 'good' },
  { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
];

export const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FM', label: 'Federated States Of Micronesia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'GU', label: 'Guam' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PW', label: 'Palau' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VI', label: 'Virgin Islands' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

export const optionLength = [
  { value: 1, label: 'general' },
  {
    value: 2,
    label:
      'Evil is the moment when I lack the strength to be true to the Good that compels me.',
  },
  {
    value: 3,
    label:
      "It is now an easy matter to spell out the ethic of a truth: 'Do all that you can to persevere in that which exceeds your perseverance. Persevere in the interruption. Seize in your being that which has seized and broken you.",
  },
];

export const dogOptions = [
  { id: 1, label: 'Chihuahua' },
  { id: 2, label: 'Bulldog' },
  { id: 3, label: 'Dachshund' },
  { id: 4, label: 'Akita' },
];

export const groupedOptions = [
  {
    label: 'Colours',
    options: colourOptions,
  },
  {
    label: 'Flavours',
    options: flavourOptions,
  },
];

export const lbus = [
  // { value: "sg", label: "SG" },
  { value: "my", label: "MY" },
  { value: "ph", label: "PH" },
  { value: "vn", label: "VN" },
  { value: "sg", label: "SG" },
  { value: "all", label: "ALL" },
];

export const apps = [
  { value: "sales", label: "Sales Portal" },
  { value: "hr", label: "HR Portal" },
  { value: "pulse", label: "Pulse" },
  { value: "pulsevn", label: "Pulse For Ops" },
];

export const platform = [
  { value: "Android", label: "Android" },
  { value: "Ios", label: "IOS" },
];

export const phFiles = [
  { id: 1, date: "20-Mar-2021",app:"sales",env:"UAT", jsonFilePath:"/data/PH/20-Mar-2021/cucumber.json",reportPath:"/PH/20-Mar-2021/Sales-portal-test-results.pdf"},
  { id: 2, date: "23-Mar-2021",app:"sales",env:"UAT", jsonFilePath:"/data/PH/23-Mar-2021/cucumber.json",reportPath:"/PH/23-Mar-2021/Sales-portal-test-results.pdf" },
  { id: 3, date: "24-Mar-2021",app:"sales",env:"UAT", jsonFilePath:"/data/PH/24-Mar-2021/cucumber.json",reportPath:"/PH/24-Mar-2021/Sales-portal-test-results.pdf" },
  { id: 4, date: "25-Mar-2021",app:"hr",env:"UAT", jsonFilePath:"/data/PH/25-Mar-2021/cucumber.json",reportPath:"/PH/25-Mar-2021/Sales-portal-test-results.pdf" },
  { id: 5, date: "26-Mar-2021",app:"hr",env:"UAT", jsonFilePath:"/data/PH/26-Mar-2021/cucumber.json",reportPath:"/PH/26-Mar-2021/Sales-portal-test-results.pdf" },

];

export const myFiles = [
  { id: 1, date: "22-Mar-2021",app:"sales",env:"UAT", jsonFilePath:"/data/MY/22-Mar-2021/cucumber.json",reportPath:"/MY/22-Mar-2021/Sales-portal-test-results.pdf"},
];

export const salesPortal = [
  { id: 1, date: "20-Mar-2021",lbu:"ph",build:"1",env:"UAT", jsonFilePath:"/data/sales/PH/20-Mar-2021/cucumber.json",reportPath:"/sales/PH/20-Mar-2021/Sales-portal-test-results.pdf"},
  { id: 2, date: "23-Mar-2021",lbu:"ph",build:"2",env:"UAT", jsonFilePath:"/data/sales/PH/23-Mar-2021/cucumber.json",reportPath:"/sales/PH/23-Mar-2021/Sales-portal-test-results.pdf" },
  { id: 3, date: "24-Mar-2021",lbu:"ph",build:"3",env:"UAT", jsonFilePath:"/data/sales/PH/24-Mar-2021/cucumber.json",reportPath:"/sales/PH/24-Mar-2021/Sales-portal-test-results.pdf" },
  { id: 4, date: "25-Mar-2021",lbu:"ph",build:"4",env:"UAT", jsonFilePath:"/data/sales/PH/25-Mar-2021/cucumber.json",reportPath:"/sales/PH/25-Mar-2021/Sales-portal-test-results.pdf" },
  { id: 5, date: "26-Mar-2021",lbu:"ph",build:"5",env:"UAT", jsonFilePath:"/data/sales/PH/26-Mar-2021/cucumber.json",reportPath:"/sales/PH/26-Mar-2021/Sales-portal-test-results.pdf" },
  { id: 6, date: "02-Mar-2021",lbu:"my",build:"6",env:"UAT", jsonFilePath:"/data/sales/MY/02-Mar-2021/cucumber.json",reportPath:"/sales/MY/02-Mar-2021/Sales-portal-test-results.pdf"},
  { id: 7, date: "04-Mar-2021",lbu:"my",build:"7",env:"UAT", jsonFilePath:"/data/sales/MY/04-Mar-2021/cucumber.json",reportPath:"/sales/MY/04-Mar-2021/Sales-portal-test-results.pdf"},
  { id: 8, date: "08-Mar-2021",lbu:"my",build:"8",env:"UAT", jsonFilePath:"/data/sales/MY/08-Mar-2021/cucumber.json",reportPath:"/sales/MY/08-Mar-2021/Sales-portal-test-results.pdf"},
  { id: 9, date: "12-Mar-2021",lbu:"my",build:"9",env:"UAT", jsonFilePath:"/data/sales/MY/12-Mar-2021/cucumber.json",reportPath:"/sales/MY/12-Mar-2021/Sales-portal-test-results.pdf"},
  { id: 10, date: "22-Mar-2021",lbu:"my",build:"10",env:"UAT", jsonFilePath:"/data/sales/MY/22-Mar-2021/cucumber.json",reportPath:"/sales/MY/22-Mar-2021/Sales-portal-test-results.pdf"},
  { id: 11, date: "24-Feb-2021",lbu:"my",build:"11",env:"UAT", jsonFilePath:"/data/sales/MY/24-Feb-2021/cucumber.json",reportPath:"/sales/MY/24-Feb-2021/Sales-portal-test-results.pdf"},
  { id: 12, date: "27-Feb-2021",lbu:"my",build:"12",env:"UAT", jsonFilePath:"/data/sales/MY/27-Feb-2021/cucumber.json",reportPath:"/sales/MY/27-Feb-2021/Sales-portal-test-results.pdf"},

];

export const hrPortal = [
  { id: 1, date: "20-Mar-2021",lbu:"ph",build:"1",env:"UAT", jsonFilePath:"/data/sales/PH/20-Mar-2021/cucumber.json",reportPath:"/sales/PH/20-Mar-2021/Sales-portal-test-results.pdf"},
  { id: 2, date: "23-Mar-2021",lbu:"ph",build:"2",env:"UAT", jsonFilePath:"/data/sales/PH/23-Mar-2021/cucumber.json",reportPath:"/sales/PH/23-Mar-2021/Sales-portal-test-results.pdf" },
  { id: 2, date: "24-Mar-2021",lbu:"my",build:"3",env:"UAT", jsonFilePath:"/data/sales/PH/24-Mar-2021/cucumber.json",reportPath:"/sales/PH/24-Mar-2021/Sales-portal-test-results.pdf" },
];

export const pulse = [
  { id: 1, date: "16-Apr-2021",lbu:"sg",build:"1",platform:"Android",env:"UAT", jsonFilePath:"/data/pulse/SG/16-Apr-2021/cucumber.json",reportPath:"/pulse/SG/16-Apr-2021/OnePulse-app-test-results.pdf" },
  { id: 2, date: "19-Apr-2021",lbu:"sg",build:"2",platform:"Android",env:"UAT", jsonFilePath:"/data/pulse/SG/19-Apr-2021/cucumber.json",reportPath:"/pulse/SG/19-Apr-2021/OnePulse-app-test-results.pdf" },
  { id: 3, date: "19-Apr-2021",lbu:"sg",build:"3",platform:"Android",env:"PRE-PROD", jsonFilePath:"/data/pulse/SG/19-Apr-2021/cucumber_preprod.json",reportPath:"/pulse/SG/19-Apr-2021/OnePulse-Regression_prepod_build.pdf" },
  { id: 4, date: "19-Apr-2021",lbu:"my",build:"4",platform:"Android",env:"UAT", jsonFilePath:"/data/pulse/MY/24-Mar-2021/cucumber.json",reportPath:"/pulse/MY/24-Mar-2021/Sales-portal-test-results.pdf" },
  { id: 5, date: "19-Apr-2021",lbu:"vn",build:"5",platform:"Android",env:"UAT", jsonFilePath:"/data/pulse/SG/19-Apr-2021/cucumber_preprod.json",reportPath:"/pulse/SG/19-Apr-2021/OnePulse-Regression_prepod_build.pdf" },
  { id: 6, date: "19-Apr-2021",lbu:"ph",build:"6",platform:"Android",env:"UAT", jsonFilePath:"/data/pulse/MY/24-Mar-2021/cucumber.json",reportPath:"/pulse/MY/24-Mar-2021/Sales-portal-test-results.pdf" },

];

export const pulseops = [
  { id: 1, date: "15-Apr-2021",lbu:"vn",build:"1",platform:"Android",env:"UAT", jsonFilePath:"/data/pulseops/VN/15-Apr-2021/cucumber.json",reportPath:"/pulseops/VN/15-Apr-2021/PulseForOps-app-test-results.pdf"},
];

export const treeHeaders = [
  {
      title: 'ID',
      field: 'id',
      type: 'number',
      width: 100
    }, {
      title: 'Name',
      field: 'errorname',
      type: 'string'
    }, {
      title: 'Feature',
      field: 'featurename',
      type: 'string'
    }
];
