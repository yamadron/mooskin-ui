// tslint:disable-next-line:no-reference
/// <reference path="../components/custom.d.ts"/>

import * as React from 'react';

import {Col, Grid, Row} from '../components/index';

import Bar from './examples/Bar.example';
import Button from './examples/Button.example';
import CheckBox from './examples/CheckBox.example';
import CheckListItem from './examples/CheckListItem.example';
import DatePicker from './examples/DatePicker.example';
import Doughnut from './examples/Doughnut.example';
import File from './examples/File.example';
import Form from './examples/Form.example';
import GridExample from './examples/Grid.example';
import Headings from './examples/Headings.example';
import HorizontalRangeBar from './examples/HorizontalRangeBar.example';
import Input from './examples/Input.example';
import Line from './examples/Line.example';
import Pie from './examples/Pie.example';
import Radio from './examples/Radio.example';
import RadioAccordion from './examples/RadioAccordion.example';
import RadioTabs from './examples/RadioTabs.example';
import Select from './examples/Select.example';
import SmallIconButton from './examples/SmallIconButton.example';
import Switch from './examples/Switch.example';
import TabbedContent from './examples/TabbedContent.example';
import Table from './examples/Table.example';
import TextArea from './examples/TextArea.example';
import TopNotification from './examples/TopNotification.example';

export default (props: any) => {
    return(
        <Grid>
            <Row>
                <Col>
                    <DatePicker />
                </Col>
            </Row>
            <Row>
                <Col lg={4} md={12}>
                    <Select />
                </Col>
                <Col lg={4} md={6}>
                    <Button />
                </Col>
                <Col lg={4} md={6}>
                    <Switch />
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6}>
                    <Input />
                </Col>
                <Col lg={6} md={6}>
                    <TextArea />
                </Col>
            </Row>
            <Row>
                <Col lg={4} md={12}>
                    <TopNotification />
                </Col>
                <Col lg={4} md={6}>
                    <Radio />
                </Col>
                <Col lg={4} md={6}>
                    <CheckBox />
                </Col>
            </Row>
            <Row>
                <Col lg={4} md={12}>
                    <SmallIconButton />
                </Col>
                <Col lg={4} md={6}>
                    <HorizontalRangeBar />
                </Col>
                <Col lg={4} md={6}>
                    <Headings />
                </Col>
            </Row>
            <Row>
                <Col lg={9} md={8}>
                    <TabbedContent />
                </Col>
                <Col lg={3} md={4}>
                    <RadioAccordion />
                </Col>
            </Row>
            <Row>
                <Col>
                    <RadioTabs />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form />
                </Col>
            </Row>
            <Row>
                <Col xs="hidden">
                    <Table />
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6}>
                    <CheckListItem />
                </Col>
                <Col lg={6} md={6}>
                    <File />
                </Col>
            </Row>
            <Row>
                <Col>
                    <GridExample />
                </Col>
            </Row>
            <Row>
                <Pie />
                <Doughnut />
            </Row>
            <Bar />
            <Line />
        </Grid>
    );
};
