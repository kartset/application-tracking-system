import * as Yup from 'yup';

export const tableColumns = [
    {
        field: 'position',
        name: 'Position',
        mobileOptions: {
            render: () => {},
            show: true
        },
        header: true,
        tag: false,
        boolean: false,
        truncateText: false,
        width: '100%',
        render: () => {}

    },
    {
        field: 'type',
        name: 'Type',
        mobileOptions: {
            render: () => {},
            show: true
        },
        header: false,
        tag: false,
        boolean: false,
        truncateText: true,
        width: '100%',
        render: () => {}

    },
    {
        field: 'currentVacancies',
        name: 'Curr. Vac.',
        mobileOptions: {
            render: () => {},
            show: true
        },
        header: false,
        tag: false,
        boolean: false,
        truncateText: false,
        width: '100%',
        render: () => {}

    },
    {
        field: 'public',
        name: 'public',
        mobileOptions: {
            render: () => {},
            show: true
        },
        header: true,
        tag: false,
        boolean: true,
        truncateText: false,
        width: '100%',
        render: () => {}

    },
    // {
    //     field: 'remote',
    //     name: 'Remote',
    //     mobileOptions: {
    //         render: () => {},
    //         show: true
    //     },
    //     header: false,
    //     tag: false,
    //     boolean: true,
    //     truncateText: false,
    //     width: '100%',
    //     render: () => {}

    // },
    // {
    //     field: 'posted',
    //     name: 'Posted',
    //     mobileOptions: {
    //         render: () => {},
    //         show: true
    //     },
    //     header: false,
    //     tag: false,
    //     boolean: true,
    //     truncateText: false,
    //     width: '100%',
    //     render: () => {}
    // },
    {
        field: 'salary',
        name: 'Salary',
        mobileOptions: {
            render: () => {},
            show: true
        },
        header: false,
        tag: false,
        boolean: true,
        truncateText: false,
        width: '100%',
        render: () => {}
    },
    {
        field: 'location',
        name: 'Location',
        mobileOptions: {
            render: () => {},
            show: true
        },
        header: false,
        tag: false,
        boolean: true,
        truncateText: false,
        width: '100%',
        render: () => {}
    },
    {
        field: 'experience',
        name: 'Experience',
        mobileOptions: {
            render: () => {},
            show: true
        },
        header: false,
        tag: false,
        boolean: true,
        truncateText: false,
        width: '100%',
        render: () => {}
    },
    {
        field: 'equity',
        name: 'Equity',
        mobileOptions: {
            render: () => {},
            show: true
        },
        header: false,
        tag: false,
        boolean: true,
        truncateText: false,
        width: '100%',
        render: () => {}
    },
    {
        field: 'actions',
        name: 'Actions',
        mobileOptions: {
            render: () => {},
            show: true
        },
        header: false,
        tag: false,
        boolean: true,
        truncateText: false,
        width: '100%',
        render: () => {}
    },
]


// form one data

export const jobPositionOptions = [
    {text:'Fresher', value:'fresher'},
    {text:'Associate', value:'associate'},
    {text:'Senior', value:'senior'},
    {text:'Executive', value:'executive'},
    {text:'Advisory', value:'advisory'},
]

export const jobTypeOptions = [
    {text:'Freelance', value:'freelance'},
    {text:'Full-Time', value:'fullTime'},
    {text:'Part-Time', value:'partTime'},
    {text:'Contractual', value:'contractual'},
    {text:'Internship', value:'internship'},
    {text:'Seasonal', value:'seasonal'}
]

export const departmentOptions = [
    {text: 'Sales', value:'sales'},
    {text: 'Marketing', value:'marketing'},
    {text: 'Design', value:'design'},
    {text: 'Engineering', value:'engineering'}

]

export const formSchema = Yup.object({
    title: Yup.string().required("Required"),
    position: Yup.string().oneOf(jobPositionOptions.map((option) => option.value)).required("Required"),
    type: Yup.string().oneOf(jobTypeOptions.map((option) => option.value)).required("Required"),
    location: Yup.string().required("Required"),
    remote: Yup.boolean().default(true),
    department: Yup.string().oneOf(departmentOptions.map((option) => option.value)).required("Required"),
})

export const initialValues = { 
    title: '', 
    position: '', 
    type: '', 
    location: '', 
    remote:true,  
    department: '' 
}

export const formOne = [
    {
        field: 'title',
        text: 'Job Title',
        subtext: 'A job title is a name or designation given to a job or position',
        placeholder: 'Enter Job Title',
        elementType: HTMLInputElement.name,
        type: 'input',
        options: undefined,
        subElement: undefined
    },
    {
        field: 'position',
        text: 'Job Position',
        subtext: 'A job position is a function you serve at a company',
        placeholder: 'Select option',
        elementType: HTMLSelectElement.name,
        type: 'select',
        options: jobPositionOptions,
        subElement: undefined
    },
    {
        field: 'type',
        text: 'Job Type',
        subtext: 'A job type defines the accounting behavior for the related job',
        placeholder: 'Select option',
        elementType: HTMLSelectElement.name,
        type: 'select',
        options: jobTypeOptions,
        subElement: undefined
    },
    {
        field: 'location',
        text: 'Job Location',
        subtext: 'A job location usually means where the job is performed',
        placeholder:'Job Location',
        elementType: HTMLInputElement.name,
        type: 'input',
        options: undefined,
        subElement:{
            field: 'remote',
            text: 'Remote Friendly',
            type: 'checkbox',
            elementType:HTMLInputElement.name,
        }

    },
    {
        field: 'department',
        text: 'Department',
        subtext: 'Department is one part of a large organization',
        placeholder: 'Select option',
        elementType: HTMLSelectElement.name,
        type: 'select',
        options: departmentOptions,
        subElement: undefined
    }
]