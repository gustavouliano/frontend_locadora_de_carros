import { ChangeEvent, useId } from "react";
import { Container, Input, Label } from "./styles";

type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    checked: boolean,
    label?: string,
    borderRadius?: 'sm' | 'md'
}

const CheckboxInput = ({ checked, onChange, label, borderRadius = 'md' }: Props) => {
    const referenceId = useId();
    return (
        <Container>
            {label && <Label htmlFor={referenceId}>{label}</Label>}

            <Input
                type="checkbox"
                id={referenceId}
                checked={checked}
                onChange={onChange}
                $borderRadius={borderRadius}
            />
        </Container>
    );
}

export default CheckboxInput;