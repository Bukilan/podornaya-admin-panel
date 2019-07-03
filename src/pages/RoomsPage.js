import React, {Component} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBBtn,
    MDBBadge,
} from "mdbreact";
import db from '../Firebase'


function secToDate(sec) {
    let curdate = new Date(null);
    curdate.setTime(sec);
    return curdate.toLocaleString()
}


class RoomsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            room1: true,
            room2: true,
            room3: true,
            room4: true,
            room5: true,
        };
    }

    componentDidMount(){
        db.collection("booking")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (Date.now() < doc.data().arrive_date.seconds * 1000) {
                        let data = doc.data().room_id;
                        switch (data) {
                            case "room1":
                                this.setState({room1: 'booked'});
                                break;
                            case "room2":
                                this.setState({room2: 'booked'});
                                break;
                            case "room3":
                                this.setState({room3: 'booked'});
                                break;
                            case "room4":
                                this.setState({room4: 'booked'});
                                break;
                            case "room5":
                                this.setState({room5: 'booked'});
                                break
                        }
                    }

                    if (Date.now() > doc.data().departure_date.seconds * 1000) {
                        let data = doc.data().room_id;
                        switch (data) {
                            case "room1":
                                this.setState({room1: true});
                                break;
                            case "room2":
                                this.setState({room2: true});
                                break;
                            case "room3":
                                this.setState({room3: true});
                                break;
                            case "room4":
                                this.setState({room4: true});
                                break;
                            case "room5":
                                this.setState({room5: true});
                                break
                        }
                    }

                    if (Date.now() >= doc.data().arrive_date.seconds * 1000 && Date.now() <= doc.data().departure_date.seconds * 1000) {
                        let data = doc.data().room_id;
                        switch (data) {
                            case "room1":
                                this.setState({room1: false});
                                break;
                            case "room2":
                                this.setState({room2: false});
                                break;
                            case "room3":
                                this.setState({room3: false});
                                break;
                            case "room4":
                                this.setState({room4: false});
                                break;
                            case "room5":
                                this.setState({room5: false});
                                break
                        }
                    }
                });
            });
    }


    isFree = function (item) {
        if ( item === true ){ return "success"}
        if ( item === false ){ return "danger" }
        if ( item === 'booked'){return "warning"} else {return "dark"}
    };

    getStatus = function (item) {
        if ( item === true ){ return "Свободно"}
        if ( item === false ){ return "Занято" }
        if ( item === 'booked'){return "Бронь"} else {return "Ошибка"}
    };

    render(){
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12" className="mt-3 mx-auto">
                            <MDBRow>
                                <MDBCol>
                                    <MDBCard style={{ width: "18rem", margin:"20px 38%" }}>
                                        <MDBCardImage className="img-fluid" src="http://www.podgornaya.ru/wp-content/uploads/2015/07/IMG_7447.jpg" waves />
                                        <MDBCardBody>
                                            <MDBCardTitle className="text-center" >Номер «Стандарт» 2-х местный</MDBCardTitle>
                                            <MDBBtn size="sm" href="http://www.podgornaya.ru/rooms/nomer-standart-2-h-mestny-e/" outline color="info">Подробнее</MDBBtn>
                                            <MDBBadge style={{marginLeft: "50px", fontSize: "12px"}} color={this.isFree(this.state.room1)}>{this.getStatus(this.state.room1)}</MDBBadge>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol>
                                    <MDBCard style={{ width: "18rem", margin:"20px " }}>
                                        <MDBCardImage className="img-fluid" src="http://www.podgornaya.ru/wp-content/uploads/2015/07/IMG_7462.jpg" waves />
                                        <MDBCardBody>
                                            <MDBCardTitle className="text-center">Номер «Стандарт» 3-х местный</MDBCardTitle>
                                            <MDBBtn size="sm" href="http://www.podgornaya.ru/rooms/nomer-standart-3-h-mestny-j/" outline color="info">Подробнее</MDBBtn>
                                            <MDBBadge style={{marginLeft: "50px", fontSize: "12px"}} color={this.isFree(this.state.room2)}>{this.getStatus(this.state.room2)}</MDBBadge>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBCard style={{ width: "18rem", margin:"20px" }}>
                                        <MDBCardImage className="img-fluid" src="http://www.podgornaya.ru/wp-content/uploads/2015/06/IMG_7378.jpg" waves />
                                        <MDBCardBody>
                                            <MDBCardTitle className="text-center">Апартаменты №1 (двухкомнатный)</MDBCardTitle>
                                            <MDBBtn size="sm" href="http://www.podgornaya.ru/rooms/appartamenty-1-dvuhkomnatny-j/" outline color="info">Подробнее</MDBBtn>
                                            <MDBBadge style={{marginLeft: "50px", fontSize: "12px"}} color={this.isFree(this.state.room3)}>{this.getStatus(this.state.room3)}</MDBBadge>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol>
                                    <MDBCard style={{ width: "18rem", margin:"20px"}}>
                                        <MDBCardImage className="img-fluid" src="http://www.podgornaya.ru/wp-content/uploads/2015/06/IMG_7424.jpg" waves />
                                        <MDBCardBody>
                                            <MDBCardTitle className="text-center" >Апартаменты №2 (однокомнатный)</MDBCardTitle>
                                            <MDBBtn size="sm" href="http://www.podgornaya.ru/rooms/appartamenty-2-odnokomnatny-j/" outline color="info">Подробнее</MDBBtn>
                                            <MDBBadge style={{marginLeft: "50px", fontSize: "12px"}} color={this.isFree(this.state.room4)}>{this.getStatus(this.state.room4)}</MDBBadge>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol>
                                    <MDBCard style={{ width: "18rem", margin:"20px" }}>
                                        <MDBCardImage className="img-fluid" src="http://www.podgornaya.ru/wp-content/uploads/2015/06/IMG_7426.jpg" waves />
                                        <MDBCardBody>
                                            <MDBCardTitle className="text-center">Улучшенный номер №3 (двухкомнатный)</MDBCardTitle>
                                            <MDBBtn size="sm" href="http://www.podgornaya.ru/rooms/uluchshenny-j-nomer-3-dvuhkomnatny-j/" outline color="info">Подробнее</MDBBtn>
                                            <MDBBadge style={{marginLeft: "50px", fontSize: "12px"}} color={this.isFree(this.state.room5)}>{this.getStatus(this.state.room5)}</MDBBadge>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default RoomsPage;
