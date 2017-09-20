import * as React from 'react';

import styles from './SideBar.css';

import {SmallIconButton} from '../index';

export interface ISideBarProps{

    /** wether the sidebar should be toggable by a button */
    button?: boolean;

    /** sidebar class */
    className?: string;

    /** styles classes for Sidebar Button */
    buttonClass?: string;

    /** styles for Sidebar Button */
    buttonStyle?: React.CSSProperties;

    /** override sidebar styles */
    style?: React.CSSProperties;

    /** wether the sidebar should hide when an item is clicked */
    hideClick?: boolean;

    /** sidebar children */
    children?: Array<React.ReactElement<ISideBarItemProps>> | React.ReactElement<ISideBarItemProps>;
}

export interface ISideBarItemProps{

    /** item href */
    href?: string;

    /** item label */
    label: string;

    /** item image */
    image?: string;

    /** image when item is active */
    imageOn?: string;

    /** if active */
    active?: boolean;

    /** which subMenu is active to apply classes to the Item */
    activeSubMenu?: boolean;

    /** sidebar class */
    className?: string;

    /** override sidebar styles */
    style?: React.CSSProperties;

    subMenuStyle?: React.CSSProperties;

    subMenuClasses?: string;

    /** callback function when mouse enters the Item, mainly used to toggle SubMenu */
    onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;

    /** callback function when mouse leaves the item, mainly used to toggle SubMenu */
    onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;

    /** callback function when item is clicked */
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

    /** item children */
    children?: Array<React.ReactElement<ISideBarItemProps>> | React.ReactElement<ISideBarItemProps>;

}

export interface ISubMenuProps{

    /** wether the sidebar should be displayed or not */
    display?: boolean;

    /** callback function when mouse enters the Item, mainly used to toggle SubMenu */
    onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;

    /** callback function when mouse leaves the item, mainly used to toggle SubMenu */
    onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;

    /** sidebar class */
    className?: string;

    /** override sidebar styles */
    style?: React.CSSProperties;

    /** sidebar children */
    children?: Array<React.ReactElement<ISideBarItemProps>> | React.ReactElement<ISideBarItemProps>;
}

export interface ISideBarState {
    activeItem?: number;
    display: boolean;
    subMenuDisplay?: boolean;
    smallDisplay?: boolean;
    activeSecondary?: number;
    activeSubMenu?: number;
}

export default class SideBar extends React.Component<ISideBarProps, ISideBarState>{

    static defaultProps = {
        className: '',
        style: {},
    };

    static Item: React.StatelessComponent<ISideBarItemProps>;
    static SubMenu: React.StatelessComponent<ISubMenuProps>;

    constructor(props: ISideBarProps){

        super(props);

        this.state = {
            activeItem: this.getActiveItem(),
            activeSecondary: -1,
            activeSubMenu: -1,
            display: false,
            // secondaryActive: this.getActiveSecondary(),
            smallDisplay: false,
            subMenuDisplay: false
        };
    }

    componentWillMount(){
        this.setState(this.getInitialState());
    }

    // componentWillReceiveProps(nextProps: ISideBarProps) {
    //     this.setState({ display: nextProps.display});
    // }

    render(){

        const cover = this.getCover();

        const button = this.getButton();

        const subMenus = this.initiateSubMenus();

        const smallDisplay = this.state.smallDisplay ? styles.smallOn : styles.smallOff;

        const display = this.state.display ? styles.sidebarOn : styles.sidebarOff;

        const sideBar = (
            <div
                className={`${styles.sidebar} ${this.props.className} ${display} ${smallDisplay}`}
                style={this.props.style}
            >
                {this.getItems()}
            </div>
        );

        return(
            <div className={`sidebar-component`}>
                {button}
                {sideBar}
                {subMenus}
                {cover}
            </div>
        );

    }

    getInitialState = () => {
        return {
            display: this.props.button ? false : true,
            smallDisplay: false
        };
    }

    getItems(){

        const items: Array<React.ReactElement<ISideBarItemProps>> = [];

        React.Children.forEach(this.props.children, (child, index) => {

            if (React.isValidElement<ISideBarItemProps>(child)){

                if (child.props.children){
                    items.push(
                        <Item
                            key={index}
                            image={child.props.image}
                            imageOn={child.props.imageOn}
                            label={child.props.label}
                            href={child.props.href}
                            active={this.state.activeItem === index}
                            onClick={this.onClickItem(index, child)}
                            onMouseEnter={this.subMenuOn(index)}
                            onMouseLeave={this.subMenuOff}
                            style={child.props.style}
                            className={child.props.className}
                            activeSubMenu={this.state.activeSubMenu === index}
                        />
                    );
                } else {
                    items.push(
                        <Item
                            key={index}
                            image={child.props.image}
                            imageOn={child.props.imageOn}
                            label={child.props.label}
                            href={child.props.href}
                            active={this.state.activeItem === index}
                            onClick={this.onClickItem(index, child)}
                            style={child.props.style}
                            className={child.props.className}
                        />
                    );
                }

            }else{
                throw new Error('<SideBar> only accepts <Item> elements as children');
            }
        });

        return items;
    }

    initiateSubMenus = () => {
        return React.Children.map(this.props.children, (child, index) => {
            if (React.isValidElement<ISideBarItemProps>(child)){
                if (child.props.children){
                    return this.getSubMenu(child, index);
                }
            }
        });
    }

    getSubMenu = (item: React.ReactElement<ISideBarItemProps>, index: number) => {
        if (React.isValidElement<ISideBarItemProps>(item)){
            const items = item.props.children ? item.props.children : [];
            return (
                <SubMenu
                    className={item.props.subMenuClasses}
                    style={item.props.subMenuStyle}
                    display={this.displaySubMenu(index)}
                    onMouseEnter={this.subMenuOn(index)}
                    onMouseLeave={this.subMenuOn()}
                >
                    {this.getSubMenuItems(items)}
                </SubMenu>
            );
        }
    }

    displaySubMenu = (index: number) => {
        if (this.state.subMenuDisplay && this.state.activeSubMenu === index){
            return true;
        }
        return false;
    }

    getSubMenuItems = (items: Array<React.ReactElement<ISideBarItemProps>> | React.ReactElement<ISideBarItemProps>) => {
        const newItems: Array<React.ReactElement<ISideBarItemProps>> = [];
        if (Array.isArray(items)){
            items.forEach((item: React.ReactElement<ISideBarItemProps>, index: number) => {
                newItems.push(
                    <Item
                        key={index}
                        label={item.props.label}
                        href={item.props.href}
                        onClick={this.onClickSecondary(index, item)}
                        style={item.props.style}
                        className={item.props.className}
                        active={this.state.activeSecondary === index}
                    />
                );
            });
        } else {
            return (
                <Item
                    label={items.props.label}
                    href={items.props.href}
                    onClick={this.onClickSecondary(0, items)}
                    style={items.props.style}
                    className={items.props.className}
                    active={this.state.activeSecondary === 0}
                />
            );
        }
        return newItems;
    }

    onClickButton = () => {
        return (e: React.MouseEvent<HTMLDivElement>) => {
            this.setState({display: true, smallDisplay: true});
        };
    }

    onClickItem = (itemIndex: number, item: React.ReactElement<ISideBarItemProps>) => {
        return (e: React.MouseEvent<HTMLDivElement>) => {
            if (!item.props.children){
                if (this.props.hideClick && this.props.button){
                    item.props.onClick && item.props.onClick(e);
                    this.setState({activeItem: itemIndex, display: false, subMenuDisplay: false, smallDisplay: false});
                } else if (this.props.hideClick){
                    item.props.onClick && item.props.onClick(e);
                    this.setState({activeItem: itemIndex, subMenuDisplay: false, smallDisplay: false});
                } else {
                    item.props.onClick && item.props.onClick(e);
                    this.setState({activeItem: itemIndex});
                }
            } else {
                item.props.onClick && item.props.onClick(e);
                this.setState({activeItem: itemIndex});
            }
        };
    }

    onClickSecondary = (itemIndex: number, item: React.ReactElement<ISideBarItemProps>) => {
        return (e: React.MouseEvent<HTMLDivElement>) => {
            if (this.props.hideClick && this.props.button){
                item.props.onClick && item.props.onClick(e);
                this.setState({activeSecondary: itemIndex, display: false, subMenuDisplay: false, smallDisplay: false});
            } else if (this.props.hideClick){
                item.props.onClick && item.props.onClick(e);
                this.setState({activeSecondary: itemIndex, subMenuDisplay: false, smallDisplay: false});
            } else {
                item.props.onClick && item.props.onClick(e);
                this.setState({activeSecondary: itemIndex});
            }
        };
    }

    getActiveItem() {
        const childrenArray = React.Children.toArray(this.props.children);

        for (const [index, value] of childrenArray.entries()){
            if (React.isValidElement<ISideBarItemProps>(value) && value.props.active){
                return index;
            }
        }

    }

    getCover = () => {
        if (this.state.display){
            const coverDisplay = this.coverClasses();
            return <div className={`${styles.cover} ${coverDisplay}`} onClick={this.toggle}/>;
        }
    }

    coverClasses = () => {
        if (this.props.button && this.state.display){
            return styles.coverOn;
        } else if (this.state.display && this.state.smallDisplay){
            return styles.coverSmall;
        } else {
            return '';
        }
    }

    getButton = () => {
        const buttonDisplay = this.props.button ? styles.buttonOn : '';
        return (
            <div>
                <SmallIconButton
                    icon="view headline"
                    onClick={this.onClickButton()}
                    className={`${styles.button} ${buttonDisplay} ${this.props.buttonClass}`}
                    style={this.props.buttonStyle}
                />
            </div>
        );
    }

    toggle = () => {
        this.setState({display: false, smallDisplay: false});
    }

    subMenuOn = (index?: number) => {
        return (e: React.MouseEvent<HTMLElement>) => {
            this.setState({subMenuDisplay: true, activeSubMenu: index});
        };
    }

    subMenuOff = () => {
        this.setState({subMenuDisplay: false, activeSubMenu: -1});
    }
}

export const Item: React.StatelessComponent<ISideBarItemProps> = (props) => {

    Item.defaultProps = {
        className: '',
        style: {}
    };

    const getImage = () => {
        if (!props.active){
            return props.image;
        } else if (props.active){
            return props.imageOn ? props.imageOn : props.image;
        }
    };

    const activeItem = props.active ? styles.activeItem : '';
    const arrow = props.activeSubMenu ? styles.arrow : '';
    const arrowStyle = props.image ? styles.arrowImg : styles.arrowNoImg;

    return(
        <div
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            className={`item-component ${styles.itemContainer} ${props.className}`}
            style={props.style}
        >
            <div className={`${arrow} ${arrowStyle}`} />
            <a
                href={props.href}
                className={`${styles.anchor} ${activeItem}`}
            >
                <img src={getImage()} className={styles.image} />
                <span>{props.label}</span>
            </a>
        </div>
    );
};

export const SubMenu: React.StatelessComponent<ISubMenuProps> = (props) => {

    SubMenu.defaultProps = {
        className: '',
        style: {}
    };

    const display = props.display ? styles.subMenuOn : styles.sidebarOff;

    return(
        <div
            className={`item-component ${styles.sidebar} ${styles.subMenu} ${display} ${props.className}`}
            style={props.style}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            {props.children}
        </div>
    );
};
