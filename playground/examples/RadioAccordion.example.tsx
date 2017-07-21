import * as React from 'react';

import {Button, Fieldset, H2, Input, RadioAccordion, RadioAccordionContent} from '../../components/index/index';

export default (props: any) => {

    return(
        <Fieldset legend="Accordion Element" style={{display: 'inline-block', width: '800px'}}>
            <RadioAccordion>
                <RadioAccordionContent title="Click here!">Nice Content eh?</RadioAccordionContent>
                <RadioAccordionContent title="I'm a radio too" style={{color: '#5CCDDF', fontStyle: 'italic'}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged.
                </RadioAccordionContent>
                <RadioAccordionContent title="Let's try a heading">
                    <H2 style={{margin: '0px 0px 10px 0px'}}>
                        H2 heading incoming!
                    </H2>
                    ...and some text of course!
                </RadioAccordionContent>
                <RadioAccordionContent title="Mix of elements">
                    <H2 style={{margin: '0px 0px 10px 10px'}}>
                        H2 heading incoming!
                    </H2>
                    <Input placeholder="Yoohoo tabs!"/>
                    <Button>Ah..Tabs...</Button>
                </RadioAccordionContent>
            </RadioAccordion>
        </Fieldset>
    );
};
