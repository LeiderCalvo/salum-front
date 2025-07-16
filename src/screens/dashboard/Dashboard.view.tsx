import { AvatarFallback, AvatarImage, AvatarRoot, Container, Icon, Table } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { HiBadgeCheck, HiXCircle, HiFire, HiTrash, HiPencil } from "react-icons/hi"
import { Tag } from "@/components/ui/tag"
import { useNavigate } from "react-router"
import { Avatar } from "@/components/ui/avatar"

interface DashboardViewProps {
    profiles: any[]
}

export const DashboardView = ({ profiles }: DashboardViewProps) => {
    const navigate = useNavigate();

    const getFullName = (profile) => {
        const { first_name, second_name } = profile

        const secondName = second_name ? ` ${second_name}` : ""

        return `${first_name}${secondName}`
    }

    const getFullLastName = (profile) => {
        const { first_surname, second_surname } = profile

        const secondSurname = second_surname ? ` ${second_surname}` : ""

        return `${first_surname}${secondSurname}`
    }

    const getCheckOrCrossIcon = condition =>
        <Icon fontSize="2xl">
            {condition ?
                <HiBadgeCheck size={24} color="#17f461" /> :
                <HiXCircle size={24} color="red" />
            }
        </Icon>

    const getPromisedIcon = profile =>
        <Icon fontSize="2xl">
            <HiFire color={profile.promise_date ? "red" : "gray"} />
        </Icon>

    const getGenderTag = profile => profile.gender === "female" ?
        <Tag size="sm" colorPalette="pink">F</Tag> : <Tag size="sm" colorPalette="blue">M</Tag>

    const rows = profiles.map((item, index) => (
        <Table.Row
            key={item.id}
            onClick={() => {
                navigate("/profile-detail", { state: { user: item } })
            }
            }
        >
            <Table.Cell >{index}</Table.Cell>
            <Table.Cell >
                <AvatarRoot>
                    <AvatarFallback>
                        <Avatar size="xl" name={item.first_name}  />
                    </AvatarFallback>
                    <AvatarImage src={`https://ctmkrhcfysnaufjwxriu.supabase.co/storage/v1/object/public/profile.avatars//${item.id}.png`} />
                </AvatarRoot>
            </Table.Cell>
            <Table.Cell >{getFullName(item)}</Table.Cell>
            <Table.Cell >{getFullLastName(item)}</Table.Cell>
            <Table.Cell textAlign='center'>{getGenderTag(item)}</Table.Cell>
            <Table.Cell textAlign='center'>
                <Tag size="sm" colorPalette={"green"}>
                    {item.status}
                </Tag>
            </Table.Cell>
            {/* <Table.Cell textAlign='center'>{getCheckOrCrossIcon(item.baptism_date)}</Table.Cell> */}
            <Table.Cell textAlign='center'>{getPromisedIcon(item)}</Table.Cell>
            <Table.Cell >
                <Button variant="subtle" size="xs" disabled>
                    <HiPencil />
                </Button>
            </Table.Cell>
            {/* <Table.Cell>
                <Button variant="subtle" size="xs" disabled>
                    <HiTrash />
                </Button>
            </Table.Cell> */}
        </Table.Row>
    ))

    return (
        <Container centerContent fluid>
            <Button onClick={() => navigate("/form")}>
                Go To Form
            </Button>
            <Table.Root stickyHeader interactive>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader></Table.ColumnHeader>
                        <Table.ColumnHeader></Table.ColumnHeader>
                        <Table.ColumnHeader>Nombres</Table.ColumnHeader>
                        <Table.ColumnHeader>Apellidos</Table.ColumnHeader>
                        <Table.ColumnHeader>Genero</Table.ColumnHeader>
                        <Table.ColumnHeader>Estado</Table.ColumnHeader>
                        {/* <Table.ColumnHeader>Bautizado</Table.ColumnHeader> */}
                        <Table.ColumnHeader>ES</Table.ColumnHeader>
                        <Table.ColumnHeader></Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{rows}</Table.Body>
            </Table.Root>
        </Container>
    )
}