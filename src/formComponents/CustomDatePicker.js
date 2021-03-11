import React, {useState} from "react";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {fieldToTextField} from "formik-material-ui";

export default function CustomDatePicker(props) {
    const [open, setOpen] = useState(false);
    const {
        form: { setFieldValue },
        field: { name }
    } = props;

    const onChange = React.useCallback(
        newDate => {
            setFieldValue(name, newDate);
            setOpen(false);
        },
        [setFieldValue, name]
    );
    const onClick = () => {
        setOpen(!open);
    }

    return <KeyboardDatePicker
        {...fieldToTextField(props)}
        onChange={onChange}
        onClick={onClick}
        variant="inline"
        open={open}
        format="dd.MM.yyyy"
    />;
}
