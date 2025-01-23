import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const ApliedJobsTable = () => {
    return (
        <div  >
            <Table>
                <TableCaption>
                    A List of Aplied Jobs
                </TableCaption>
                <TableHeader>

                    <TableRow>
                        <TableHead className="">
                            Date
                        </TableHead>
                        <TableHead>
                            Job Role
                        </TableHead>
                        <TableHead>
                            Company
                        </TableHead>
                        <TableHead>
                            Location
                        </TableHead>
                        <TableHead className="text-right">
                            Status
                        </TableHead>
                    </TableRow>

                </TableHeader>
                    <TableBody >
                        {
                            [1, 2, 3, 4].map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        01/05/2023
                                    </TableCell>
                                    <TableCell>Software Engineer </TableCell>
                                    <TableCell>
                                        Google
                                    </TableCell>
                                    <TableCell>
                                        Delhi
                                    </TableCell>
                                    <TableCell className="text-right"> <Badge>Selected</Badge></TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
            </Table>
        </div>
    )
}

export default ApliedJobsTable