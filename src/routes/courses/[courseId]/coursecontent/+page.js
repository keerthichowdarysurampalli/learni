/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {

    console.log(params);
    const { courseId } = params;
    console.log(url.searchParams.get("path"));
    console.log(courseId);

    const path = url.searchParams.get("path");

    const files = [
        {
            id: 2,
            name: "assignments",
            description: "Assignments for this course.",
            type: "FOLDER",
            size: 150,
            date: "2021-01-15",
            iconColor: "text-red-400"
        },
        {
            id: 2,
            name: "disccusion board",
            description: "Assignments for this course.",
            type: "FOLDER",
            size: 150,
            date: "2021-01-15",
            iconColor: "text-yellow-400"
        },
        {
            id: 2,
            name: "disccusion board 2",
            description: "Assignments for this course.",
            type: "FOLDER",
            size: 150,
            date: "2021-01-15",
            iconColor: "text-yellow-400"
        },
        {
            id: 2,
            name: "disccusion board/hello.pptx",
            description: "Assignments for this course.",
            type: "PPTX",
            size: 150,
            date: "2021-01-15",
            iconColor: "text-violet-400"
        },
        {
            id: 2,
            name: "disccusion board 3",
            description: "Assignments for this course.",
            type: "FOLDER",
            size: 150,
            date: "2021-01-15",
            iconColor: "text-gray-400"
        },
        {
            id: 2,
            name: "assignments final",
            description: "Assignments for this course.",
            type: "FOLDER",
            size: 150,
            date: "2021-01-15",
            iconColor: "text-red-400"
        },
        {
            id: 2,
            name: "assignments 3",
            description: "Assignments for this course.",
            type: "FOLDER",
            size: 150,
            date: "2021-01-15",
            iconColor: "text-red-400"
        },
        {
            id: 2,
            name: "assignments/assignment 1",
            description: "Assignments for this course.",
            type: "FOLDER",
            size: 150,
            date: "2021-01-15",
            iconColor: "text-red-400"
        },
        {
            id: 243,
            name: "assignments/assignment 2",
            description: "Assignments for this course.",
            type: "FOLDER",
            size: 150,
            date: "2021-01-15",
            iconColor: "text-yellow-400"
        },
        {
            id: 1,
            name: "assignments/assignment 1/assignment 1 file 1.docx",
            description: "This is the first document for assignment 1.",
            link: "https://example.com/assignment1/doc1",
            size: 150,
            date: "2021-01-15",
            iconColor: "text-red-400"
        },
        {
            id: 2,
            name: "assignments/assignment 1/report format.pdf",
            description: "A PDF document describing the report format for assignment 1.",
            link: "https://example.com/assignment1/report-format",
            size: 120,
            date: "2021-02-01",
            iconColor: "text-blue-400"
        },
        {
            id: 3,
            name: "assignment 2 file 1.pdf",
            description: "Another document for assignment 2 with some content.",
            link: "https://example.com/assignment2/doc1",
            size: 180,
            type: "PDF",
            date: "2021-03-10",
            iconColor: "text-emerald-400"
        },
        {
            id: 3,
            name: "cool.xlsx",
            description: "Another document for assignment 2 with some content.",
            link: "https://example.com/assignment2/doc1",
            size: 180,
            type: "XLSX",
            date: "2021-03-10",
            iconColor: "text-pink-400"
        },
        {
            id: 3,
            name: "assignment 2 file 1.pdf",
            description: "Another document for assignment 2 with some content.",
            link: "https://example.com/assignment2/doc1",
            size: 180,
            type: "PDF",
            date: "2021-03-10",
            iconColor: "text-rose-400"
        },
        {
            id: 3,
            name: "assignment 2 file 1.pdf",
            description: "Another document for assignment 2 with some content.",
            link: "https://example.com/assignment2/doc1",
            size: 180,
            type: "PDF",
            date: "2021-03-10",
            iconColor: "text-rose-400"
        },
        {
            id: 4,
            name: "assignments/assignment 2/report format.pdf",
            description: "Detailed instructions and guidelines for assignment 2.",
            link: "https://example.com/assignment2/report-format",
            size: 90,
            date: "2021-04-20",
            iconColor: "text-yellow-400"
        },
        {
            id: 4,
            name: "assignments/assignment 2/report format.pdf",
            description: "Detailed instructions and guidelines for assignment 2.",
            link: "https://example.com/assignment2/report-format",
            size: 90,
            date: "2021-04-20",
            iconColor: "text-yellow-400"
        },
        {
            id: 4,
            name: "assignments/assignment 2/report format.pdf",
            description: "Detailed instructions and guidelines for assignment 2.",
            link: "https://example.com/assignment2/report-format",
            size: 90,
            date: "2021-04-20",
            iconColor: "text-yellow-400"
        },
        {
            id: 4,
            name: "assignments/assignment 2/report format.pdf",
            description: "Detailed instructions and guidelines for assignment 2.",
            link: "https://example.com/assignment2/report-format",
            size: 90,
            date: "2021-04-20",
            iconColor: "text-yellow-400"
        },
        {
            id: 5,
            name: "personal/todo-list.txt",
            description: "A simple text file containing a personal to-do list.",
            link: "https://example.com/personal/todo-list",
            size: 10,
            date: "2022-05-05",
            iconColor: "text-pink-400"
        },
        {
            id: 6,
            name: "personal/recipes/cooking.docx",
            description: "Recipes for various delicious dishes you can cook at home.",
            link: "https://example.com/personal/recipes",
            size: 280,
            date: "2022-06-12",
            iconColor: "text-violet-400"
        },
        {
            id: 7,
            name: "work/project1/project1-report.docx",
            description: "The report for project 1 at work.",
            link: "https://example.com/work/project1/report",
            size: 200,
            date: "2023-01-10",
            iconColor: "text-blue-400"
        },
        {
            id: 6,
            name: "personal/recipes/cooking.docx",
            description: "Recipes for various delicious dishes you can cook at home.",
            link: "https://example.com/personal/recipes",
            size: 280,
            date: "2022-06-12",
            iconColor: "text-violet-400"
        },
        {
            id: 7,
            name: "work/project1/project1-report.docx",
            description: "The report for project 1 at work.",
            link: "https://example.com/work/project1/report",
            size: 200,
            date: "2023-01-10",
            iconColor: "text-blue-400"
        },
        {
            id: 8,
            name: "work/project2/code/javascript.js",
            description: "JavaScript code for project 2.",
            link: "https://example.com/work/project2/code",
            size: 150,
            date: "2023-02-14",
            iconColor: "text-green-400"
        },
        {
            id: 9,
            name: "personal/photos/vacation/beach.jpg",
            description: "A beautiful beach photo from your vacation.",
            link: "https://example.com/personal/photos/beach",
            size: 300,
            date: "2023-03-25",
            iconColor: "text-yellow-400"
        },
        {
            id: 10,
            name: "work/project3/reports/quarterly-summary.pdf",
            description: "Quarterly summary report for project 3.",
            link: "https://example.com/work/project3/summary",
            size: 180,
            date: "2023-04-30",
            iconColor: "text-pink-400"
        },
    ]
    let filteredFiles = []
    if (path) {
        console.log(path);
        filteredFiles = files.filter(file => file.name.startsWith(path));
        console.log(filteredFiles);
        filteredFiles = filteredFiles.filter(
            (file) => {
                const fileStructure = file.name.split("/");
                const pathStructure = path.split("/");
                if (fileStructure.length === pathStructure.length + 1) {
                    return true;
                }
                return false;
            }
        )
        return {
            files: filteredFiles
        }
    } else {
        filteredFiles = files.filter(file => !file.name.includes("/"));
    }
    return {
        files: filteredFiles
    }
}