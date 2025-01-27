
import { MoreHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect } from "react"

const shortListing = ["accept", "Rejected", "Hired"]

export const ApplicantTable = ({applications}) => {

    console.log(applications)
    useEffect(() => {
            
    })
    return (
        <div>

            <Table>
                <TableCaption>
                    A List of Applicants
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-left">
                {
                    applications?.map((application, index) => (
                        
                    <tr key={index}>
                        <TableCell className="font-medium">{application.applicant?.name}</TableCell>
                        <TableCell>{application.applicant?.email}</TableCell>
                        <TableCell>{application.applicant?.phonenumber}</TableCell>
                        <TableCell>{application.resume}</TableCell>
                        <TableCell>{application.createdAt.split('T')[0]}</TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>

                                <PopoverContent className="w-40">

                                    {

                                        shortListing.map((status, index) => (

                                            <div className="flex items-center cursor-pointer mt-2" key={index}>
                                                <span>{status}</span>
                                            </div>
                                        ))
                                    }
                                </PopoverContent>

                            </Popover>
                        </TableCell>
                    </tr>
                    ))
                }
                </TableBody>

            </Table>
        </div>
    )
}