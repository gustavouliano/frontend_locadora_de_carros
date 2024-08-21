import { ChangeEvent, useId } from "react";
import { Container, Input, Label } from "./styles";

type Props = {
    value: number,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    placeholder?: string,
    borderRadius?: 'sm' | 'md'
}

const NumberInput = ({ value, onChange, label, placeholder, borderRadius = 'md' }: Props) => {
    const referenceId = useId();
    return (
        <Container>
            {label && <Label htmlFor={referenceId}>{label}</Label>}

            <Input
                type="number"
                id={referenceId}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                $borderRadius={borderRadius}
            />
        </Container>
    );
}

export default NumberInput;