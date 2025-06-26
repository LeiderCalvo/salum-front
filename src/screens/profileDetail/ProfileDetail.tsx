import React, { ReactElement } from "react";
import { HiMail, HiPhone, HiTrash, HiUser, HiBackspace } from "react-icons/hi";
import { FaBirthdayCake } from "react-icons/fa";
import { Avatar } from "@/components/ui/avatar";
import { Box, Button, Flex, Grid, GridItem, Heading, IconButton, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useLocation, useNavigate } from "react-router";

export const ProfileDetail: React.FC = () => {
  const { state: { user } } = useLocation()
  const navigate = useNavigate()
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Flex direction="column" bg={bg} p={8} borderRadius="lg" shadow="lg">
      <Flex justify="space-between" align="flex-start" mb={6}>
        <Button onClick={() => navigate("/")}>
          <HiBackspace />
        </Button>
      </Flex>

      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">
          {user.first_name} {user.second_name ?? ""} {user.first_surname} {user.second_surname ?? ""}
        </Heading>
        <IconButton aria-label="Delete profile" icon={<HiTrash />} colorScheme="red" variant="outline" />
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr 1fr" }} gap={8}>
        {/* Profile Image and Basic Info */}
        <GridItem>
          <Stack spacing={4} align="center">
            <Avatar size="2xl" name={user.first_name} src={user.avatar ?? undefined} />
            <Text color="gray.500" fontSize="sm">
              {user.status.toUpperCase()}
            </Text>
            <Box>
              <InfoRow icon={<HiMail />} label="Email" value={user.email ?? "Not provided"} />
              <InfoRow icon={<HiPhone />} label="Phone" value={user.phone} />
              <InfoRow icon={<HiUser />} label="Gender" value={user.gender} />
              <InfoRow
                icon={<FaBirthdayCake />}
                label="Birthday"
                value={new Date(user.birthday_date).toLocaleDateString()}
              />
            </Box>
          </Stack>
        </GridItem>

        {/* Details Section */}
        <GridItem>
          <Stack spacing={6}>
            <Section title="Personal">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <InfoRow label="Academic Level" value={user.academic_level.replaceAll("_", " ")} />
                <InfoRow label="Marital Status" value={user.marital_status} />
                <InfoRow label="NID" value={`${user.nid_type.toUpperCase()} - ${user.nid_number}`} />
                <InfoRow
                  label="Birthplace"
                  value={`${user.birthday_city}, ${user.birthday_department}, ${user.birthday_country}`}
                />
              </SimpleGrid>
            </Section>

            <Section title="Occupation">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <InfoRow label="Type" value={user.occupation_type} />
                {user.occupation_area && <InfoRow label="Area" value={user.occupation_area} />}
                {user.occupation_description && <InfoRow label="Description" value={user.occupation_description} />}
              </SimpleGrid>
            </Section>

            <Section title="Address">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <InfoRow label="Address" value={user.address_line} />
                <InfoRow label="Neighborhood" value={user.address_neighborhood} />
                <InfoRow label="City" value={user.address_city} />
                <InfoRow label="Department" value={user.address_department} />
                <InfoRow label="Country" value={user.address_country} />
              </SimpleGrid>
            </Section>
          </Stack>
        </GridItem>

        {/* Spiritual Life */}
        <GridItem>
          <Stack spacing={4}>
            <Section title="Spiritual Life">
              <SimpleGrid columns={1} spacing={3}>
                {user.promise_date && <InfoRow label="Promise Date" value={new Date(user.promise_date).toLocaleDateString()} />}
                {user.baptism_date && <InfoRow label="Baptism Date" value={new Date(user.baptism_date).toLocaleDateString()} />}
                {user.baptism_minister && <InfoRow label="Minister" value={user.baptism_minister} />}
                {user.baptism_church && <InfoRow label="Church" value={user.baptism_church} />}
                {user.baptism_city && <InfoRow label="City" value={user.baptism_city} />}
                {user.baptism_department && <InfoRow label="Department" value={user.baptism_department} />}
                {user.baptism_country && <InfoRow label="Country" value={user.baptism_country} />}
              </SimpleGrid>
            </Section>
          </Stack>
        </GridItem>
      </Grid>
    </Flex>
  );
};

// Section.tsx
export const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Box>
    <Heading size="xl" mb={2}>
      {title}
    </Heading>
    {children}
    <br />
  </Box>
);

interface InfoRowProps {
  label: string;
  value: string;
  icon?: ReactElement;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, icon }) => {
  return (
    <Flex align="center" gap={2}>
      {icon || null}
      <Text fontWeight="bold">{label}:</Text>
      <Text>{value}</Text>
    </Flex>
  );
};
