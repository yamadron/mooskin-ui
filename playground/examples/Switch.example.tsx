import * as React from 'react';

import {IInputCallbackData} from '../../components/_utils/types/commonTypes';

import {Fieldset, Switch} from '../../components/index/index';

export interface ISwitchState{
    automations: IAutomations[];
}

export interface IAutomations{
    title: string;
    complete: boolean;
    running: boolean;
}

export default class SwitchExample extends React.Component<{}, ISwitchState>{

    constructor(){
        super();
        this.state = {
            automations: [
                {
                    complete: true,
                    running: false,
                    title: 'do this'
                },
                {
                    complete: true,
                    running: true,
                    title: 'do that'
                },
                {
                    complete: false,
                    running: false,
                    title: 'do nothing'
                }
            ]
        };
    }

    public render(){

        const listAutomations = this.state.automations.map((automation, i) => {
            return (
                <Switch
                    key={i}
                    onClick={this.switchAuto(i)}
                    on={automation.running}
                    disabled={!automation.complete}
                    dataLabel={automation.title}
                    onLabel={'On'}
                    offLabel={'Off'}
                    disabledLabel={'Not Working'}
                />
            );
        });

        return(
            <Fieldset legend="Switch Element" style={{display: 'inline-block'}}>
                <div>
                    {listAutomations}
                </div>
            </Fieldset>
        );
    }

    private switchAuto = (i: number) => {
        return (e: React.MouseEvent<HTMLElement>, data: IInputCallbackData) => {
            const automations = this.state.automations;
            automations[i].running = !this.state.automations[i].running;

            // update state
            this.setState({automations});
            console.log(data.value);
        };
    }
}
