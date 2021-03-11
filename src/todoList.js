import React, {useEffect, useMemo, useState} from "react";
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Typography
} from "@material-ui/core";
import {API_NAMESPACE} from "./mirage";
import {RadioButtonUnchecked, CheckCircleOutline, DeleteOutline} from "@material-ui/icons";
import FormulaireTache from "./formulaireTache";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {TODO_ACTION_READY} from "./store";

const useStyles = makeStyles((theme) => ({
    todoList: {
        position: "relative",
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        width: 400
    },
    todoTitle: {
        textAlign: "center"
    }
}));

export default function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();
    const todoState = useSelector(state => state.todo);
    const dispatch = useDispatch();

    useEffect(() => {
        if (todoState === "INIT") {
            fetch(API_NAMESPACE + "/tache/list")
                .then(response => response.json())
                .then(json => {
                    setTodoList(json);
                    dispatch(TODO_ACTION_READY);
                });
        }
        // eslint-disable-next-line default-case
        switch (todoState) {
            case "ADDING":
            case "INIT":
                setIsLoading(true);
                break;
            case "IDLE":
                setIsLoading(false);
                break;
            case "DONE":
                setIsLoading(false);
                dispatch({type: "todo/reset"});
                break;
        }
    }, [todoState]);

    const todoStateMap = {
        "INIT": "Initialisation...",
        "IDLE": "TodoList prête",
        "ADDING": "Ajout en cours...",
        "DONE": "Todo ajouté !"
    }

    return (
        <>
            <FormulaireTache/>
            <Paper elevation={2} className={classes.todoList}>
                <Typography variant="h5" className={classes.todoTitle} color={isLoading? "secondary" : "primary"} aria-live="polite">
                    {todoStateMap[todoState]}
                </Typography>
                <List>
                    {todoList.map(tache => <ListItem key={tache.id}>
                        <ListItemIcon><IconButton>{tache.done ? <CheckCircleOutline/> : <RadioButtonUnchecked/>}</IconButton></ListItemIcon>
                        <ListItemText primary={tache.texte} secondary={tache.date}/>
                        <ListItemSecondaryAction>
                            <IconButton>
                                <DeleteOutline/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>)}
                </List>
            </Paper>
        </>
    );
}
