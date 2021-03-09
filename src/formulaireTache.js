import React, {useState} from "react";
import {Formik, Form, Field, useFormik} from 'formik';
import {Button, CircularProgress} from '@material-ui/core';
import {fieldToTextField, TextField} from 'formik-material-ui';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import chLocale from "date-fns/locale/fr-CH";
import {API_NAMESPACE} from "./mirage";
import MuiTextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import './formulaireTache.scss';

function UpperCasingTextField(props) {
    const {
        form: { setFieldValue },
        field: { name }
    } = props;
    const onChange = React.useCallback(
        event => {
            const { value } = event.target;
            setFieldValue(name, value?.toUpperCase());
        },
        [setFieldValue, name]
    );
    return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}

function CustomDatePicker(props) {
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

export default function FormulaireTache() {

    const maValidation = Yup.object({
        nom: Yup.string()
            .min(4, "Le nom doit faire 4 caractères mini")
            .required("Votre nom est obligatoire !")
    });

    const init = {
        date: '2021-06-01T00:00:00.000Z',
        nom: '',
        texte: ''
    };

    const postFormulaire = (values, {setSubmitting}) => {
        fetch(API_NAMESPACE+"/tache", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...values, done: false})})
            .then(() => {
                setSubmitting(false);
            })
    };

    return (
        <Formik
            initialValues={init}
            validationSchema={maValidation}
            onSubmit={postFormulaire}>
            {
                ({submitForm, isSubmitting}) => (
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={chLocale}>
                        <Form id="task-form">
                            <Field component={CustomDatePicker} name="date" label="Date" />
                            <Field
                                component={UpperCasingTextField}
                                name="nom"
                                label="Votre nom"/>
                            <Field
                                component={TextField}
                                name="texte"
                                label="Tâche à accomplir"/>
                            {isSubmitting && <CircularProgress/>}
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}>
                                Sauvegarder
                            </Button>
                        </Form>
                    </MuiPickersUtilsProvider>
                )
            }
        </Formik>
    );
}
