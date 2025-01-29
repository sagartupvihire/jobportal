import { useApplicationStore } from "@/store/useApplicationStore"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useEffect } from "react"

const ApliedJobsTable = () => {
    const {getAppliedJob, appliedJobs} = useApplicationStore()

    useEffect(() =>{
        getAppliedJob()
    },[ getAppliedJob])

    console.log("applied job",appliedJobs)
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
                            appliedJobs?.applications?.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {item.createdAt.split('T')[0]}
                                    </TableCell>
                                    <TableCell>{item.job.title} </TableCell>
                                    <TableCell>
                                        {item.job.company.companyname}
                                    </TableCell>
                                    <TableCell>
                                        {item.job.location}
                                    </TableCell>
                                    <TableCell className="text-right"> <Badge>{item.status }  </Badge></TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
            </Table>
        </div>
    )
}

export default ApliedJobsTable