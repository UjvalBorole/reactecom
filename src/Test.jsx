import React, { useState } from 'react';
import {
  MDBInput,
MDBContainer,
  MDBCheckbox,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function App() {
  
  return (
   <MDBContainer>
    <h2 className='text-center my-3'>Admin</h2>
    <MDBRow tag="form" className='g-3'>
      <MDBCol md="4">
        <MDBInput
        //   value={formValue.fname}
          name='fname'
        //   onChange={onChange}
          id='validationCustom01'
          required
          label='First name'
        />
      </MDBCol>
      <MDBCol md="4">
        <MDBInput
        //   value={formValue.lname}
          name='lname'
        //   onChange={onChange}
          id='validationCustom02'
          required
          label='Last name'
        />
      </MDBCol>
      <MDBCol md="4">
        <div className='input-group has-validation'>
          <span className='input-group-text' id='inputGroupPrepend'>
            @
          </span>
          <input
            type='text'
            className='form-control'
            id='validationCustomUsername'
            placeholder='Username'
            required
          />
          <div className='invalid-feedback'>Please choose a username.</div>
        </div>
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
        //   value={formValue.city}
          name='city'
        //   onChange={onChange}
          id='validationCustom03'
          required
          label='City'
        />
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
        //   value={formValue.zip}
          name='zip'
        //   onChange={onChange}
          id='validationCustom05'
          required
          label='Zip'
        />
      </MDBCol>
      
      <MDBCol size="12">
        <MDBBtn type='submit'>Add Item</MDBBtn>
      </MDBCol>
    </MDBRow>
    

    <MDBTable align='middle my-5'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Title</th>
          <th scope='col'>Status</th>
          <th scope='col'>Position</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>John Doe</p>
                <p className='text-muted mb-0'>john.doe@gmail.com</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>Software engineer</p>
            <p className='text-muted mb-0'>IT department</p>
          </td>
          <td>
            <MDBBadge color='success' pill>
              Active
            </MDBBadge>
          </td>
          <td>Senior</td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>Alex Ray</p>
                <p className='text-muted mb-0'>alex.ray@gmail.com</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>Consultant</p>
            <p className='text-muted mb-0'>Finance</p>
          </td>
          <td>
            <MDBBadge color='primary' pill>
              Onboarding
            </MDBBadge>
          </td>
          <td>Junior</td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/7.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>Kate Hunington</p>
                <p className='text-muted mb-0'>kate.hunington@gmail.com</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>Designer</p>
            <p className='text-muted mb-0'>UI/UX</p>
          </td>
          <td>
            <MDBBadge color='warning' pill>
              Awaiting
            </MDBBadge>
          </td>
          <td>Senior</td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>
   </MDBContainer>
  );
}