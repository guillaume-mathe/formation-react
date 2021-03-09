import React, {useEffect, useState} from "react";
import {List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {API_NAMESPACE} from "./mirage";
import {CheckCircle, CheckCircleOutline, DeleteOutline} from "@material-ui/icons";
import FormulaireTache from "./formulaireTache";

export default function TodoList() {
    const [todoList, setTodoList] = useState([]);

    useEffect(()=>{
        fetch(API_NAMESPACE+"/tache/list")
            .then(response => response.json())
            .then(json => setTodoList(json));
    },[]);

    return (
        <>
            <FormulaireTache/>
            <List>
                {todoList.map(tache => <ListItem>
                    <ListItemIcon><CheckCircle/></ListItemIcon>
                    <ListItemText>{tache.texte}</ListItemText>
                    <ListItemSecondaryAction><DeleteOutline/></ListItemSecondaryAction>
                </ListItem>)}
            </List>
        </>

    );
}
