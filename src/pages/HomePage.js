import React from "react";
import {
    MDBBadge,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBModal,
    MDBIcon,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdbreact";
import db from '../Firebase'
import "./HomePage.css";


const data_panel = {
    columns: [
      {
        'label': 'Номер',
        'field': 'room_name',
        'sort': 'asc'
      },
      {
        'label': 'Дата заезда',
        'field': 'arrive_date',
        'sort': 'asc'
      },
      {
        'label': 'Дата выезда',
        'field': 'departure_date',
        'sort': 'asc'
      },
      {
        'label': 'Имя заказчика',
        'field': 'name',
        'sort': 'asc'
      },
      {
        'label': 'Телефон',
        'field': 'phone',
        'sort': 'asc'
      },
      {
        'label': 'Кол-во гостей',
        'field': 'guests',
        'sort': 'asc'
      },
      {
        'label': 'Статус',
        'field': 'status',
        'sort': 'asc'
      },
      {
        'label': '',
        'field': 'edit_row',
        'sort': 'asc'
      },
      {
        'label': '',
        'field': 'delete_row',
        'sort': 'asc'
      }
    ],
  };


function dateToSec(date) {
    let data = new Date(date);
    return data
}

function secToDate(sec) {
  let curdate = new Date(null);
  curdate.setTime(sec);
  let newdate = curdate.getDate() + '.' + curdate.getMonth() + '.' + curdate.getFullYear() + '  ' + curdate.getHours() + ':00';
  return newdate.toString()
}

function secToFormalDate(sec) {
    let curdate = new Date(null);
    curdate.setTime(sec);
    let year,month,day,hour;
    year = curdate.getFullYear();
    if (curdate.getMonth().toString().length === 1){month = "0" + curdate.getMonth()} else {month = curdate.getMonth()}
    if (curdate.getDate().toString().length === 1){day = "0" + curdate.getDate()} else {day = curdate.getDate()}
    if (curdate.getHours().toString().length === 1){hour = "0" + curdate.getHours()} else {hour = curdate.getHours()}
    return year + '-' + month + '-' + day + 'T' + hour + ':00:00'
}

function getStatus(item) {
  if (item === 'done'){return 'success'}
  if (item === 'processed'){return 'warning'}
  if (item === 'canceled'){return 'danger'}
}





class HomePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      arr_data: [],
      arr_id: [],
      modal_edit: false,
      modal_add: false,
      modal_delete: false,
      action_type: '',
      status_value: 'Статус',
      active_id: '',
      arr_new: {},

      room_name: '',
      arrive_date: '',
      departure_date: '',
      customer_name: '',
      guest_amount: '',
      status: '' ,
      phone: '',
    };
  }


  toggleEdit = () => {
    this.setState({
        modal_edit: !this.state.modal_edit
    });
  };

    toggleAdd = () => {
        this.setState({
            modal_add: !this.state.modal_add
        });
    };

    toggleDelete = () => {
        this.setState({
            modal_delete: !this.state.modal_delete
        });
    };

  handlerEdit = (e) => {
    let index = e.target.getAttribute("data-index");
    if (index !== null) {

      this.setState({
        active_id: index
      });



      this.setState({
        action_type: 'Изменение  заказа'
      });


        this.state.arr_id.forEach((item) => {
            if (item.id === this.state.active_id) {
                let id = item.id;
                let room_name = item.room_name;
                let name = item.name;
                let phone = item.phone;
                let guests = item.guests;
                let status = item.status;
                let arrive_date = item.arrive_sec;
                let departure_date = item.departure_sec;
                this.setState({
                    arr_new:{
                        id: id,
                        room_name: room_name,
                        arrive_date: arrive_date,
                        departure_date: departure_date,
                        customer_name: name,
                        guest_amount: guests,
                        status: status ,
                        phone: phone,
                    }
                }, () => {
                    if (this.state.active_id === this.state.arr_new.id) {
                        this.toggleEdit();
                    }
                })
            }
        });

    }
  };

  handlerAdd = () => {
      this.setState({
          action_type: 'Добавление заказа'
      });

      this.toggleAdd();
  };

  handlerDelete = (e) => {
      let index = e.target.getAttribute("data-index");
      if (index !== null) {

          this.setState({
              active_id: index
          });


          this.setState({
              action_type: 'Удаление  заказа'
          });

          this.toggleDelete();

      }
  };

  updateDoc = () => {
      let washingtonRef = db.collection("booking").doc(`${this.state.active_id}`);

      let obj = {};

      if (this.state.room_name !== ""){
          obj.room_name = this.state.room_name
      }

      if (this.state.customer_name !== ""){
          obj.customer_name = this.state.customer_name
      }

      if (this.state.guest_amount !== ""){
          obj.guest_amount = this.state.guest_amount
      }

      if (this.state.phone !== ""){
          obj.phone = this.state.phone
      }

      if (this.state.status !== ""){
          obj.status = this.state.status
      }

      if (this.state.arrive_date.length > 1 ){
          obj.arrive_date = dateToSec(this.state.arrive_date);
      }

      if (this.state.departure_date.length > 1){
          obj.departure_date = dateToSec(this.state.departure_date);
      }

      console.log(obj);

      this.setState({
          action_type: '',
          status_value: 'Статус',
          active_id: '',
          arr_new: {},
          room_name: '',
          arrive_date: '',
          departure_date: '',
          customer_name: '',
          guest_amount: '',
          status: '' ,
          phone: '',
      });

      this.toggleEdit();

      setTimeout(function() {window.location.reload()}, 2000);

      return washingtonRef.update(obj)
          .then(function() {
              console.log("Document successfully updated!");
          })
          .catch(function(error) {

              console.error("Error updating document: ", error);
          });

  };

  addDoc = () => {
      let washingtonRef = db.collection("booking");

      let obj = {};

      if (this.state.room_name !== "" && this.state.room_name.length >= 1){
          obj.room_name = this.state.room_name
      } else return 1;

      if (this.state.customer_name !== "" && this.state.customer_name.length >= 1){
          obj.customer_name = this.state.customer_name
      } else return 1;

      if (this.state.guest_amount !== "" && this.state.guest_amount > 0){
          obj.guest_amount = this.state.guest_amount
      } else return 1;

      if (this.state.phone !== "" && this.state.phone.length >= 1){
          obj.phone = this.state.phone
      } else return 1;

      if (this.state.status !== "" && this.state.status.length >= 1){
          obj.status = this.state.status
      } else return 1;

      if (this.state.arrive_date.length > 1 ){
          obj.arrive_date = dateToSec(this.state.arrive_date);
      } else return 1;

      if (this.state.departure_date.length > 1){
          obj.departure_date = dateToSec(this.state.departure_date);
      } else return 1;

      console.log(obj);

      this.setState({
          action_type: '',
          status_value: 'Статус',
          active_id: '',
          arr_new: {},
          room_name: '',
          arrive_date: '',
          departure_date: '',
          customer_name: '',
          guest_amount: '',
          status: '' ,
          phone: '',
      });

      this.toggleAdd();

      setTimeout(function() {window.location.reload()}, 2000);

      return washingtonRef.add(obj)
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
  };

  deleteDoc = () => {

      db.collection("booking").doc(`${this.state.active_id}`).delete()
      .then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });

      this.toggleDelete();

      setTimeout(function() {window.location.reload()}, 2000);


  };


  componentWillMount(){
    db.collection("booking")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {

            let data = doc.data();
            let room_name_val = data.room_name;
            let arrive_date_val = secToDate(data.arrive_date.seconds*1000);
            let departure_date_val = secToDate(data.departure_date.seconds*1000);
            let arrive_date_val_in_mil = secToFormalDate(data.arrive_date.seconds*1000);
            let departure_date_val_in_mil = secToFormalDate(data.departure_date.seconds*1000);
            let name_val = data.customer_name;
            let guests_val = data.guest_amount;
            let status = data.status;
            let phone = data.phone;
            let id = doc.id;
            let obj = {
                  room_name: room_name_val,
                  arrive_date: arrive_date_val,
                  departure_date: departure_date_val,
                  name: name_val,
                  phone: phone,
                  guests: guests_val,
                  status: <MDBBadge style={{fontSize: "14px"}} pill color={getStatus(status)}>{status}</MDBBadge>,
                  edit_row: <MDBBtn active outline rounded key={id} data-index={id} onClick={ this.handlerEdit } size="sm" color="white" className="px-2">
                            <i className="fas fa-pencil-alt mt-0 black-text"></i>
                            </MDBBtn>,
                  delete_row: <MDBBtn outline rounded key={id} data-index={id} onClick={ this.handlerDelete } size="sm" color="white" className="px-2">
                              <i className="fas fa-times mt-0 black-text"></i>
                              </MDBBtn>
            };
            this.setState({
              arr_data: [...this.state.arr_data, obj]
            });
            let obj_tmp = Object.assign({}, obj);
            obj_tmp.arrive_sec = arrive_date_val_in_mil;
            obj_tmp.departure_sec = departure_date_val_in_mil
            obj_tmp.id = id;
            this.setState({
              arr_id: [...this.state.arr_id, obj_tmp]
            });

            console.log(this.state.arr_id);
          });
        });
  }


  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow style={{ marginTop: "40px"}}>
            <MDBCol className="mx-auto mt-4" >
                  <MDBCard narrow>
                    <MDBCardHeader style={{ marginTop: "15px"}} className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-3 mb-2">
                      <h4 className="white-text mb-1 mx-3"> Заказы </h4>
                      <MDBBtn floating className="white-text" color="indigo" onClick={this.handlerAdd}>Добавить заказ</MDBBtn>
                    </MDBCardHeader>
                    <MDBCardBody cascade>
                      <MDBTable btn hover small scrollY maxHeight="600px" >
                        <MDBTableHead columns={data_panel.columns} />
                        <MDBTableBody rows={this.state.arr_data} />
                      </MDBTable>
                    </MDBCardBody>
                  </MDBCard>
            </MDBCol>
          </MDBRow>
            <MDBModal isOpen={this.state.modal_edit} toggle={this.toggleEdit}>
              <MDBModalHeader toggle={this.toggleEdit}>Editing</MDBModalHeader>
              <MDBModalBody>
                <MDBRow>
                  <MDBCol md="12">
                    <form>
                      <p className="h4 text-center mb-4">{this.state.action_type}</p>
                      <label htmlFor="defaultFormContactRoomEx" className="grey-text">
                        Номер комнаты
                      </label>
                      <input
                          value={this.state.arr_new.room_name}
                          onChange={event => {
                              this.setState({arr_new:{room_name: event.target.value}});
                              this.setState({room_name: event.target.value})
                          }}
                          type="text"
                          id="defaultFormContactRoomEx"
                          className="form-control"
                      />
                      <br />
                      <label htmlFor="defaultFormContactNameEx" className="grey-text">
                        Имя заказчика
                      </label>
                      <input
                          value={this.state.arr_new.customer_name}
                          onChange={event => {
                              this.setState({arr_new:{customer_name: event.target.value}});
                              this.setState({customer_name: event.target.value});
                          }}
                          type="text"
                          id="defaultFormContactNameEx"
                          className="form-control"
                      />
                      <br />
                      <label htmlFor="defaultFormContactAmountEx" className="grey-text">
                        Количество гостей
                      </label>
                      <input
                          value={this.state.arr_new.guest_amount}
                          onChange={event => {
                              this.setState({arr_new:{guest_amount: event.target.value}});
                              this.setState({guest_amount: event.target.value})
                          }}
                          type="number"
                          id="defaultFormContactAmountEx"
                          className="form-control"
                      />
                      <br />
                      <label htmlFor="defaultFormContactArriveEx" className="grey-text">
                        Дата заезда
                      </label>
                      <input
                          value={this.state.arr_new.arrive_date}
                          onChange={event => {
                              this.setState({arr_new:{arrive_date: event.target.value}});
                              this.setState({arrive_date: event.target.value})
                          }}
                          type="datetime-local"
                          id="defaultFormContactArriveEx"
                          className="form-control"

                      />
                      <br />
                      <label htmlFor="defaultFormContactDispatchEx" className="grey-text">
                        Дата отъезда
                      </label>
                      <input
                          value={this.state.arr_new.departure_date}
                          onChange={event => {
                              this.setState({arr_new:{departure_date: event.target.value}});
                              this.setState({departure_date: event.target.value})
                          }}
                          type="datetime-local"
                          id="defaultFormContactDispatchEx"
                          className="form-control"

                      />
                      <br />
                      <label htmlFor="defaultFormContactDispatchEx" className="grey-text">
                        Номер телефона
                      </label>
                      <input
                          value={this.state.arr_new.phone}
                          onChange={event => {
                              this.setState({arr_new:{phone: event.target.value}});
                              this.setState({phone: event.target.value});
                          }}
                          type="tel"
                          name="phone"
                          pattern="[0-9]{11}"
                          id="defaultFormContactDispatchEx"
                          className="form-control"

                      />
                      <br />
                      <label htmlFor="defaultFormContactAmountEx" className="grey-text">
                        Статус
                      </label>
                        <MDBDropdown>
                          <MDBDropdownToggle caret color="primary">
                            {this.state.status_value}
                          </MDBDropdownToggle>
                          <MDBDropdownMenu basic>
                            <MDBDropdownItem onClick={() => {
                                this.setState({status_value: "done"});
                                this.setState({status: "done"});
                            }}>Утверждена</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => {
                                this.setState({status_value: "processed"});
                                this.setState({status: "processed"});
                            }}>В процессе</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => {
                                this.setState({status_value: "canceled"});
                                this.setState({status: "canceled"});
                            }}>Отклонена</MDBDropdownItem>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn onClick={this.updateDoc} color="info" outline type="submit">
                  Send
                  <MDBIcon far icon="paper-plane" className="ml-2" />
                </MDBBtn>
                <MDBBtn color="secondary" onClick={this.toggleEdit}>Close</MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <MDBModal isOpen={this.state.modal_add} toggle={this.toggle}>
                <MDBModalHeader toggle={this.toggleAdd}>Add</MDBModalHeader>
                <MDBModalBody>
                    <MDBRow>
                        <MDBCol md="12">
                            <form>
                                <p className="h4 text-center mb-4">{this.state.action_type}</p>
                                <label htmlFor="defaultFormContactRoomEx" className="grey-text">
                                    Номер комнаты
                                </label>
                                <input
                                    value={this.state.arr_new.room_name}
                                    onChange={event => {
                                        this.setState({arr_new:{room_name: event.target.value}});
                                        this.setState({room_name: event.target.value})
                                    }}
                                    type="text"
                                    id="defaultFormContactRoomEx"
                                    className="form-control"
                                />
                                <br />
                                <label htmlFor="defaultFormContactNameEx" className="grey-text">
                                    Имя заказчика
                                </label>
                                <input
                                    value={this.state.arr_new.customer_name}
                                    onChange={event => {
                                        this.setState({arr_new:{customer_name: event.target.value}});
                                        this.setState({customer_name: event.target.value});
                                    }}
                                    type="text"
                                    id="defaultFormContactNameEx"
                                    className="form-control"
                                />
                                <br />
                                <label htmlFor="defaultFormContactAmountEx" className="grey-text">
                                    Количество гостей
                                </label>
                                <input
                                    value={this.state.arr_new.guest_amount}
                                    onChange={event => {
                                        this.setState({arr_new:{guest_amount: event.target.value}});
                                        this.setState({guest_amount: event.target.value})
                                    }}
                                    type="number"
                                    id="defaultFormContactAmountEx"
                                    className="form-control"
                                />
                                <br />
                                <label htmlFor="defaultFormContactArriveEx" className="grey-text">
                                    Дата заезда
                                </label>
                                <input
                                    value={this.state.arr_new.arrive_date}
                                    onChange={event => {
                                        this.setState({arr_new:{arrive_date: event.target.value}});
                                        this.setState({arrive_date: event.target.value})
                                    }}
                                    type="datetime-local"
                                    id="defaultFormContactArriveEx"
                                    className="form-control"

                                />
                                <br />
                                <label htmlFor="defaultFormContactDispatchEx" className="grey-text">
                                    Дата отъезда
                                </label>
                                <input
                                    value={this.state.arr_new.departure_date}
                                    onChange={event => {
                                        this.setState({arr_new:{departure_date: event.target.value}});
                                        this.setState({departure_date: event.target.value})
                                    }}
                                    type="datetime-local"
                                    id="defaultFormContactDispatchEx"
                                    className="form-control"

                                />
                                <br />
                                <label htmlFor="defaultFormContactDispatchEx" className="grey-text">
                                    Номер телефона
                                </label>
                                <input
                                    value={this.state.arr_new.phone}
                                    onChange={event => {
                                        this.setState({arr_new:{phone: event.target.value}});
                                        this.setState({phone: event.target.value});
                                    }}
                                    type="tel"
                                    name="phone"
                                    pattern="[0-9]{11}"
                                    id="defaultFormContactDispatchEx"
                                    className="form-control"

                                />
                                <br />
                                <label htmlFor="defaultFormContactAmountEx" className="grey-text">
                                    Статус
                                </label>
                                <MDBDropdown>
                                    <MDBDropdownToggle caret color="primary">
                                        {this.state.status_value}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu basic>
                                        <MDBDropdownItem onClick={() => {
                                            this.setState({status_value: "done"});
                                            this.setState({status: "done"});
                                        }}>Утверждена</MDBDropdownItem>
                                        <MDBDropdownItem onClick={() => {
                                            this.setState({status_value: "processed"});
                                            this.setState({status: "processed"});
                                        }}>В процессе</MDBDropdownItem>
                                        <MDBDropdownItem onClick={() => {
                                            this.setState({status_value: "canceled"});
                                            this.setState({status: "canceled"});
                                        }}>Отклонена</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn onClick={this.addDoc} color="info" outline type="submit">
                        Send
                        <MDBIcon far icon="paper-plane" className="ml-2" />
                    </MDBBtn>
                    <MDBBtn color="secondary" onClick={this.toggleAdd}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
            <MDBModal  size="sm" isOpen={this.state.modal_delete} toggle={this.toggleDelete}>
                <MDBModalHeader toggle={this.toggleDelete}>Подтверждение</MDBModalHeader>
                <MDBModalBody>
                    Вы уверены, что хотите удалить этот заказ ?
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="primary" onClick={this.deleteDoc}>Удалить</MDBBtn>
                    <MDBBtn color="danger" onClick={this.toggleDelete}>Назад</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}

export default HomePage;
