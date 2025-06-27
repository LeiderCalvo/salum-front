import {
    Badge,
    Box,
    Container,
    Fieldset,
    Flex,
    HStack,
    Input,
    Spinner,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import { HiBackspace, HiUpload } from "react-icons/hi";

import {
    NativeSelectField,
    NativeSelectRoot,
} from "@/components/ui/native-select";
import { Field } from "@/components/ui/field";
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "@/components/ui/file-button";
import { Button } from "@/components/ui/button";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Profile } from "@/schemas/profiles";
import { useNavigate } from "react-router";
import { useColorModeValue } from "@/components/ui/color-mode";

const OPTIONAL = (
    <Badge size="xs" variant="surface">
        Opcional
    </Badge>
);


interface FormViewProps {
    onSubmit: () => void;
    register: UseFormRegister<Profile>;
    errors: FieldErrors<Profile>;
    allowOccupationSection: boolean;
    allowBaptizeSection: boolean;
    loading: boolean
}

const FormView = ({ onSubmit, register, errors, allowOccupationSection, allowBaptizeSection, loading }: FormViewProps) => {
    const navigate = useNavigate()

    return (
        <Container fluid centerContent>
            <Button onClick={() => navigate("/")}>
                <HiBackspace />
            </Button>

            {loading && <FullScreenLoader />}

            <form
                noValidate
                onSubmit={onSubmit}
            >
                <Fieldset.Root size="lg" maxW="md">
                    <Stack>
                        <Fieldset.Legend>Añadir nuevo asistente</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Por favor revise muy bien los datos a añadir.
                        </Fieldset.HelperText>
                    </Stack>

                    <Fieldset.Content>
                        <FileUploadRoot>
                            <FileUploadTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <HiUpload /> Upload file
                                </Button>
                            </FileUploadTrigger>
                            <FileUploadList />
                        </FileUploadRoot>

                        <Stack marginY={30}>
                            <Fieldset.Legend>Información Personal</Fieldset.Legend>
                            <Fieldset.HelperText>
                                Por favor revise muy bien los datos a añadir.
                            </Fieldset.HelperText>
                        </Stack>

                        <HStack gap="10" width="full">
                            <Field
                                label="Primer Nombre"
                                required
                                invalid={!!errors.first_name}
                                errorText={errors.first_name?.message}
                            >
                                <Input {...register("first_name")} placeholder="Nombre 1" />
                            </Field>

                            <Field
                                label="Segundo Nombre"
                                optionalText={OPTIONAL}
                                invalid={!!errors.second_name}
                                errorText={errors.second_name?.message}
                            >
                                <Input {...register("second_name")} placeholder="Nombre 2" />
                            </Field>
                        </HStack>

                        <HStack gap="10" width="full">
                            <Field
                                label="Primer Apellido"
                                required
                                invalid={!!errors.first_surname}
                                errorText={errors.first_surname?.message}
                            >
                                <Input
                                    {...register("first_surname")}
                                    placeholder="Apellido 1"
                                />
                            </Field>
                            <Field
                                label="Segundo Apellido"
                                optionalText={OPTIONAL}
                                invalid={!!errors.second_surname}
                                errorText={errors.second_surname?.message}
                            >
                                <Input
                                    {...register("second_surname")}
                                    placeholder="Apellido 2"
                                />
                            </Field>
                        </HStack>

                        <HStack gap="10" width="full">
                            <Field
                                label="Tipo de Documento"
                                required
                                invalid={!!errors.nid_type}
                                errorText={errors.nid_type?.message}
                            >
                                <NativeSelectRoot>
                                    <NativeSelectField
                                        {...register("nid_type")}
                                        placeholder="Seleccione"
                                    >
                                        <option value="cc">Cédula de Ciudadania</option>
                                        <option value="ti">Tarjeta de Identidad</option>
                                    </NativeSelectField>
                                </NativeSelectRoot>
                            </Field>

                            <Field
                                label="Número de Documento"
                                required
                                invalid={!!errors.nid_number}
                                errorText={errors.nid_number?.message}
                            >
                                <Input
                                    {...register("nid_number")}
                                    type="number"
                                    placeholder="----------"
                                />
                            </Field>
                        </HStack>

                        <Field
                            label="Correo Electrónico"
                            optionalText={OPTIONAL}
                            invalid={!!errors.email}
                            errorText={errors.email?.message}
                        >
                            <Input
                                {...register("email")}
                                type="email"
                                placeholder="usuario@correo.com"
                            />
                        </Field>

                        <HStack gap="10" width="full">
                            <Field
                                label="Genero"
                                required
                                invalid={!!errors.gender}
                                errorText={errors.gender?.message}
                            >
                                <NativeSelectRoot>
                                    <NativeSelectField
                                        {...register("gender")}
                                        placeholder="Seleccione"
                                    >
                                        <option value="female">Mujer</option>
                                        <option value="male">Hombre</option>
                                    </NativeSelectField>
                                </NativeSelectRoot>
                            </Field>

                            <Field
                                label="Celular"
                                required
                                invalid={!!errors.phone}
                                errorText={errors.phone?.message}
                            >
                                <Input
                                    {...register("phone")}
                                    type="number"
                                    placeholder="--- --- ----"
                                />
                            </Field>
                        </HStack>
                        {/* ----------------------------------- Birthday */}
                        <HStack gap="10" width="full">
                            <Field
                                label="Fecha de Nacimiento"
                                required
                                invalid={!!errors.birthday_date}
                                errorText={errors.birthday_date?.message}
                            >
                                <Input {...register("birthday_date")} type="date" />
                            </Field>
                            <Field
                                label="Ciudad"
                                required
                                invalid={!!errors.birthday_city}
                                errorText={errors.birthday_city?.message}
                            >
                                <Input {...register("birthday_city")} placeholder="Jamundi" />
                            </Field>
                        </HStack>

                        <HStack gap="10" width="full">
                            <Field
                                label="Departamento"
                                required
                                invalid={!!errors.birthday_department}
                                errorText={errors.birthday_department?.message}
                            >
                                <Input
                                    {...register("birthday_department")}
                                    placeholder="Valle del Cauca"
                                    defaultValue="Valle del Cauca"
                                />
                            </Field>
                            <Field
                                label="País"
                                required
                                invalid={!!errors.birthday_country}
                                errorText={errors.birthday_country?.message}
                            >
                                <Input
                                    {...register("birthday_country")}
                                    placeholder="Colombia"
                                    defaultValue="Colombia"
                                />
                            </Field>
                        </HStack>

                        <Field
                            label="Estado Civil"
                            required
                            invalid={!!errors.marital_status}
                            errorText={errors.marital_status?.message}
                        >
                            <NativeSelectRoot>
                                <NativeSelectField
                                    {...register("marital_status")}
                                    placeholder="Seleccione"
                                >
                                    <option value="married">Casad@</option>
                                    <option value="single">Solter@</option>
                                    <option value="widow">Viud@</option>
                                    <option value="divorced">Divorciad@</option>
                                    <option value="accompanied">Union Libre</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                        </Field>

                        {/* ----------------------------------- Profession */}

                        <Stack marginY={30}>
                            <Fieldset.Legend>Profesión</Fieldset.Legend>
                            <Fieldset.HelperText>
                                Por favor Ingreso información relacionado a su profesión.
                            </Fieldset.HelperText>
                        </Stack>

                        <Field
                            label="Nivel Académico"
                            required
                            invalid={!!errors.academic_level}
                            errorText={errors.academic_level?.message}
                        >
                            <NativeSelectRoot>
                                <NativeSelectField
                                    {...register("academic_level")}
                                    placeholder="Seleccione"
                                >
                                    <option value="none">Sin Estudio</option>
                                    <option value="elementary_school">Primaria</option>
                                    <option value="high_school">Secundaria</option>
                                    <option value="technician">Técnico</option>
                                    <option value="technologist">Tecnólogo</option>
                                    <option value="professional">Profesional</option>
                                    <option value="specialist">Especialista</option>
                                    <option value="master">Maestría</option>
                                    <option value="doctorate">Doctorado</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                        </Field>

                        <HStack gap="10" width="full">
                            <Field
                                label="Tipo de Ocupación"
                                required
                                invalid={!!errors.occupation_type}
                                errorText={errors.occupation_type?.message}
                            >
                                <NativeSelectRoot>
                                    <NativeSelectField
                                        {...register("occupation_type")}
                                        placeholder="Seleccione"
                                    >
                                        <option value="nothing">Sin Ocupación</option>
                                        <option value="studying">Estudia</option>
                                        <option value="working">Trabaja</option>
                                    </NativeSelectField>
                                </NativeSelectRoot>
                            </Field>
                            <Field
                                label="Area de Ocupación"
                                optionalText={OPTIONAL}
                                disabled={!allowOccupationSection}
                                invalid={!!errors.occupation_area}
                                errorText={errors.occupation_area?.message}
                            >
                                <Input
                                    {...register("occupation_area")}
                                    placeholder="Cuéntanos en que trabajas..."
                                />
                            </Field>
                        </HStack>

                        <Field
                            label="Descripción de Ocupación"
                            helperText="Máximo 400 caracteres."
                            optionalText={OPTIONAL}
                            disabled={!allowOccupationSection}
                            invalid={!!errors.occupation_description}
                            errorText={errors.occupation_description?.message}
                        >
                            <Textarea {...register("occupation_description")} />
                        </Field>

                        {/* ----------------------------------- Baptism */}
                        <Stack marginY={30}>
                            <Fieldset.Legend>Bautismo</Fieldset.Legend>
                            <Fieldset.HelperText>
                                Por favor Ingreso información relacionado al bautismo.
                            </Fieldset.HelperText>
                        </Stack>

                        <Field
                            label="Estado espiritual"
                            required
                            invalid={!!errors.status}
                            errorText={errors.status?.message}
                        >
                            <NativeSelectRoot>
                                <NativeSelectField
                                    {...register("status")}
                                    placeholder="Seleccione"
                                >
                                    <option value="active">Activo</option>
                                    <option value="separated">Apartado</option>
                                    <option value="sympathizer">Simpatizante</option>
                                    <option value="friend">Amigo</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                        </Field>

                        <HStack gap="10" width="full">
                            <Field
                                label="Fecha de Bautismo"
                                disabled={!allowBaptizeSection}
                                required
                                invalid={!!errors.baptism_date}
                                errorText={errors.baptism_date?.message}
                            >
                                <Input {...register("baptism_date")} type="date" />
                            </Field>
                            <Field
                                label="Fecha de ES"
                                optionalText={OPTIONAL}
                                invalid={!!errors.promise_date}
                                errorText={errors.promise_date?.message}
                            >
                                <Input {...register("promise_date")} type="date" />
                            </Field>
                        </HStack>

                        <Field
                            label="Pastor de Bautismo"
                            required
                            disabled={!allowBaptizeSection}
                            helperText="Escriba el nombre completo. Sin prefijos como Ej: *Pastor* Fulano"
                            invalid={!!errors.baptism_minister}
                            errorText={errors.baptism_minister?.message}
                        >
                            <Input
                                {...register("baptism_minister")}
                                placeholder="Pepito Gutierrez"
                            />
                        </Field>

                        <HStack gap="10" width="full">
                            <Field
                                label="Iglesia"
                                required
                                disabled={!allowBaptizeSection}
                                invalid={!!errors.baptism_church}
                                errorText={errors.baptism_church?.message}
                            >
                                <Input {...register("baptism_church")} placeholder="Bonanza" />
                            </Field>
                            <Field
                                label="Ciudad"
                                required
                                disabled={!allowBaptizeSection}
                                invalid={!!errors.baptism_city}
                                errorText={errors.baptism_city?.message}
                            >
                                <Input {...register("baptism_city")} placeholder="Jamundi" />
                            </Field>
                        </HStack>

                        <HStack gap="10" width="full">
                            <Field
                                label="Departamento"
                                required
                                disabled={!allowBaptizeSection}
                                invalid={!!errors.baptism_department}
                                errorText={errors.baptism_department?.message}
                            >
                                <Input
                                    {...register("baptism_department")}
                                    placeholder="Valle del Cauca"
                                    defaultValue="Valle del Cauca"
                                />
                            </Field>
                            <Field
                                label="País"
                                required
                                disabled={!allowBaptizeSection}
                                invalid={!!errors.baptism_country}
                                errorText={errors.baptism_country?.message}
                            >
                                <Input
                                    {...register("baptism_country")}
                                    placeholder="Colombia"
                                    defaultValue="Colombia"
                                />
                            </Field>
                        </HStack>

                        {/* ----------------------------------- Address */}
                        <Stack marginY={30}>
                            <Fieldset.Legend>Dirección de Residencia</Fieldset.Legend>
                            <Fieldset.HelperText>
                                Por favor Ingrese su dirección actual.
                            </Fieldset.HelperText>
                        </Stack>

                        <Field
                            label="Dirección"
                            required
                            invalid={!!errors.address_line}
                            errorText={errors.address_line?.message}
                        >
                            <Input {...register("address_line")} type="address" />
                        </Field>

                        <HStack gap="10" width="full">
                            <Field
                                label="Barrio"
                                required
                                invalid={!!errors.address_neighborhood}
                                errorText={errors.address_neighborhood?.message}
                            >
                                <Input {...register("address_neighborhood")} defaultValue="Bonanza" />
                            </Field>
                            <Field
                                label="Ciudad"
                                required
                                invalid={!!errors.address_city}
                                errorText={errors.address_city?.message}
                            >
                                <Input {...register("address_city")} placeholder="Jamundi" defaultValue="Jamundi" />
                            </Field>
                        </HStack>

                        <HStack gap="10" width="full">
                            <Field
                                label="Departamento"
                                required
                                invalid={!!errors.address_department}
                                errorText={errors.address_department?.message}
                            >
                                <Input
                                    {...register("address_department")}
                                    placeholder="Valle del Cauca"
                                    defaultValue="Valle del Cauca"
                                />
                            </Field>
                            <Field
                                label="País"
                                required
                                invalid={!!errors.address_country}
                                errorText={errors.address_country?.message}
                            >
                                <Input
                                    {...register("address_country")}
                                    placeholder="Colombia"
                                    defaultValue="Colombia"
                                />
                            </Field>
                        </HStack>
                    </Fieldset.Content>

                    <Button type="submit" alignSelf="flex-start" disabled={loading}>
                        <input type="submit" />
                    </Button>

                </Fieldset.Root>
            </form>
        </Container>
    );
}

export default FormView;


const FullScreenLoader: React.FC = () => {
    const bg = useColorModeValue("whiteAlpha.800", "blackAlpha.800");

    return (
        <Flex
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            bg={bg}
            align="center"
            justify="center"
            zIndex="9999"
        >
            <Box textAlign="center">
                <Spinner size="xl" thickness="4px" color="blue.500" />
            </Box>
        </Flex>
    );
};