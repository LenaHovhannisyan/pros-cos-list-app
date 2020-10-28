import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import "./../css/style.css"

const Form = () => {
        const classes = useStyles();
        const [pros, setPros] = useState([
            {
                content: "It's really tasty",
            },
            {
                content: "It's really tasty",
            },
            {
                content: "It's really tasty",
            },
            {
                content: "",
            }
        ]);
        const [cons, setCons] = useState([
            {
                content: "Makes me fat",
            },
            {
                content: "Too expensive",
            },
            {
                content: "",
            }
        ]);

        const handleKeyDownPros = (e, i) => {
            if (e.key === 'Enter') {
                addPros(e, i);
            }
            if (e.key === 'Backspace' && pros[i].content === '') {
                e.preventDefault();
                return removePros(i);
            }
        }

        const handleKeyDownCons = (e, i) => {
            if (e.key === 'Enter') {
                addCons(e, i);
            }
            if (e.key === 'Backspace' && cons[i].content === '') {
                e.preventDefault();
                return removeCons(i);
            }
        }

        const addPros = (e, i) => {
            const newPros = [...pros];
            newPros.splice(i + 1, 0, {
                content: ''
            });
            setPros(newPros);
            setTimeout(() => {
                document.forms[0].elements[i + 1].focus();
            }, 0);
        }

        const addCons = (e, i) => {
            const newCons = [...cons];
            newCons.splice(i + 1, 0, {
                content: ''
            });
            setCons(newCons);
            setTimeout(() => {
                document.forms[0].elements[i + 1].focus();
            }, 0);
        }

        const updatePros = (e, i) => {
            const newPros = [...pros];
            newPros[i].content = e.target.value;
            setPros(newPros);
        }

        const updateCons = (e, i) => {
            console.log(e.target.value.length, i)
            if(e.target.value.length < 1) {
                setCons(cons => cons.slice(0, i).concat(cons.slice(i + 1, cons.length)));
                setTimeout(() => {
                    document.forms[0].elements[i - 1].focus();
                }, 0);
            }

            const newCons = [...cons];
            newCons[i].content = e.target.value;
            setCons(newCons);
        }

        const removePros = (i) => {
            if (i === 0 && pros.length === 1) return;
            setPros(pros => pros.slice(0, i).concat(pros.slice(i + 1, pros.length)));
            setTimeout(() => {
                document.forms[0].elements[i - 1].focus();
            }, 0);
        }

        const removeCons = (i) => {
            console.log(i)
            if (i === 0 && cons.length === 1) return;
            setCons(cons => cons.slice(0, i).concat(cons.slice(i + 1, cons.length)));
            setTimeout(() => {
                document.forms[0].elements[i - 1].focus();
            }, 0);
        }

        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <h1>Should I eat at McDonalds?</h1>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Pros</h3>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Cons</h3>
                    </Grid>
                    <Grid item xs={6}>
                        <ol>
                            {pros.map((item, i) => (
                                <li key={i}>
                                    <input
                                        type="text"
                                        value={item.content}
                                        onKeyDown={e => handleKeyDownPros(e, i)}
                                        onChange={e => updatePros(e, i)}
                                        onFocus={e => item.content.length < 1 && addPros(e, i)}
                                    />
                                </li>
                            ))}
                        </ol>
                    </Grid>
                    <Grid item xs={6}>
                        <ol>
                            {cons.map((item, i) => (
                                <li key={i}>
                                    <input
                                        type="text"
                                        value={item.content}
                                        onKeyDown={e => handleKeyDownCons(e, i)}
                                        onChange={e => updateCons(e, i)}
                                        onFocus={e => item.content.length < 1 && addCons(e, i)}
                                    />
                                </li>
                            ))}
                        </ol>
                    </Grid>
                </Grid>
            </div>
        );
    }
;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '60%',
        margin: theme.spacing('10%', 'auto'),
        border: '1px solid'
    }
}));

export default Form;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Form/>, wrapper) : false;