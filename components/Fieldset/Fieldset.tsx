import * as React from 'react';

import styles from './Fieldset.css';

export interface IFieldsetProps{

    /** fieldset id */
    id?: string;

    /** fieldset name */
    name?: string;

    /** Fieldset legend */
    legend?: string;

    /** Fieldset class */
    className?: string;

    /** override Fieldset styles */
    style?: {[key: string]: string};

    /** Fieldset children */
    children?: any;
}

export default class Fieldset extends React.Component<IFieldsetProps, {}>{

    public render(){

        const legend = this.props.legend ? {} : {display: 'none'};

        return (
            <fieldset
                id={this.props.id}
                name={this.props.name}
                className={`fieldset-component ${styles.fieldset} ${this.props.className}`}
                style={this.props.style}
            >
                <legend className={styles.legend} style={legend}>{this.props.legend}</legend>
                {this.props.children}
            </fieldset>
        );

    }
}
