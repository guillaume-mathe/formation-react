import React from "react";
import {Formik, Form, Field} from 'formik';
import {Button, CircularProgress, Typography} from '@material-ui/core';
import {TextField} from 'formik-material-ui';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import chLocale from "date-fns/locale/fr-CH";
import {API_NAMESPACE} from "./mirage";
import * as Yup from 'yup';
import CustomDatePicker from "./formComponents/CustomDatePicker";
import UpperCasingTextField from "./formComponents/UpperCasingTextField";
import {useDispatch} from "react-redux";
import './formulaireTache.scss';

export default function FormulaireTache() {
    const dispatch = useDispatch();

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
        dispatch({type: "todo/post"});
        fetch(API_NAMESPACE+"/tache", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...values, done: false})})
            .then(() => {
                setSubmitting(false);
                dispatch({type: "todo/post/ok"});
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
