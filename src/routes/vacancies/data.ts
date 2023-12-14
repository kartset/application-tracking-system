import * as Yup from 'yup';
import TimeRange from '../../components/TimeRange';
import SalaryRange from '../../components/SalaryRange';
import { GeneralRange } from '../../components/GeneralRange';

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


export const formTwoSchema = Yup.object().shape({
    numVacancies: Yup.number().min(1, "Vacancies Should be more than 1").required("Required"),
    onlyWomenHiring: Yup.boolean().default(false),
    workHours: Yup.object().shape({
        startTime:Yup.number().default(undefined), 
        startTimeMeridiem:Yup.string().oneOf(['ante', 'post']),
        endTime:Yup.number().default(undefined),
        endTimeMeridiem: Yup.string().oneOf(['ante', 'post']),
    })
    .default({ startTime: undefined, startTimeMeridiem: undefined, endTime: undefined, endTimeMeridiem: undefined})
    .test('workHours', 'Required', function () {
        const { startTime, startTimeMeridiem, endTime, endTimeMeridiem } = this.parent.workHours;
        if (startTime !== undefined && startTimeMeridiem !== undefined && endTime !== undefined && endTimeMeridiem !== undefined) {
          return true; 
        } else {
          return false;
        }
    }),
    salaryRange: Yup.object().shape({
        type: Yup.string().oneOf(['hourly', 'weekly', 'monthly', 'fullTime']).default('hourly'),
        start: Yup.number(),
        end: Yup.number(),
        negotiable: Yup.boolean().default(true)
    })
    .default({ type: 'hourly', start: undefined, end: undefined, negotiable: undefined})
    .test('salaryRange', 'Required', function () {
        const { type, start, end, negotiable } = this.parent.salaryRange ;
        if (type !== undefined && start > 0 && end > 0 && negotiable !== undefined) {
          return true; 
        } else {
          return false;
        }
    }),
    equity: Yup.object({
        start: Yup.number().default(0),
        end: Yup.number().default(0)
    }).test('equity', 'Required', function () {
        const {  start, end } = this.parent.equity ;
        if ( start > 0 && end > 0) {
          return true; 
        } else {
          return false;
        }
    }),
    immediateJoining: Yup.boolean().default(true)
})

export const formTwoInitialValues = { 
    numVacancies: 0, 
    onlyWomenHiring: false, 
    workHours: {
        startTime:undefined, 
        startTimeMeridiem:undefined,
        endTime:undefined,
        endTimeMeridiem: undefined,
    }, 
    salaryRange: {
        type: 'hourly',
        start: 0,
        end: 0,
        negotiable: true
    }, 
    equity: {
        start:0,
        end: 0
    },
    immediateJoining: true
}

export const formTwo = [
    {
        field: 'numVacancies',
        text: 'Number of Vacancies',
        subtext: 'Total Number People to Hire for this post',
        placeholder: undefined,
        elementType: HTMLInputElement.name,
        type: 'slider',
        element: undefined,
        options: undefined,
        subElement: {
            field: 'onlyWomenHiring',
            text: 'Hiring Only Women',
            type: 'checkbox',
            elementType:HTMLInputElement.name,
        }
    },
    {
        field: 'workHours',
        text: 'Work Hours',
        subtext: 'The amount of time employee would spend at work during a day',
        placeholder: undefined,
        elementType: 'custom',
        type: 'timeRange',
        element: TimeRange,
        options: undefined,
        subElement: undefined,

    },
    {
        field: 'salaryRange',
        text: 'Salary Range',
        subtext: 'A salary range is the range of pay offered for performing a job',
        placeholder: undefined,
        elementType: 'custom',
        type: 'salaryRange',
        element: SalaryRange,
        options: undefined,
        subElement: undefined,

    },
    {
        field:'equity',
        text: 'Equity',
        subtext: 'An ESOP grants company stock to employees',
        placeholder:'',
        elementType: 'custom',
        type: 'equityRange',
        element: GeneralRange,
        options: undefined,
        subElement: undefined,
    },
    {
        field: 'immediateJoining',
        text: undefined,
        subtext: undefined,
        placeholder: undefined,
        elementType: HTMLInputElement.name,
        type: 'switch',
        options: undefined,
        subElement: undefined
    }


]