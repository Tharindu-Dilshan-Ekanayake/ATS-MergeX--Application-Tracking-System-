import React, { useState } from 'react';

export default function AdminAccess() {
  const [createUser, setCreateUser] = useState(false);
  const [modifyUser, setModifyUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [roleAssignment, setRoleAssignment] = useState(false);

  const handleCreateUser = () => {
    setCreateUser(!createUser);
    const newValue = !createUser;
    setCreateUser(newValue);
    console.log(`Create User Account turned ${newValue ? 'on' : 'off'}`);
  };

  const handleModifyUser = () => {
    setModifyUser(!modifyUser);
    const newValue = !modifyUser
    setModifyUser(newValue);
    console.log(`Modify User Account turned ${newValue ? 'on' : 'off'}`);
  };

  const handleDeleteUser = () => {
    setDeleteUser(!deleteUser);
    const newValue =!deleteUser
    setDeleteUser(newValue);
    console.log(`Delete user Account turned ${newValue ? 'on' : 'off'}`);
  };

  const handleRoleAssignment = () => {
    setRoleAssignment(!roleAssignment);
    const newValue =!roleAssignment
    setRoleAssignment(newValue);
    console.log(`Role Assignment turned ${newValue ? 'on' : 'off'}`);
  };

  return (
    <div className='flex justify-center'>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='pl-10'></th>
              <th className='pl-8 pr-8 '>Turn On</th>
              <th>Turn Off</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div className='text-left'>
                  <label>Create User Account</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={createUser}
                    onChange={handleCreateUser}
                  />
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={!createUser}
                    onChange={handleCreateUser}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label>Modify User Account</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={modifyUser}
                    onChange={handleModifyUser}
                  />
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={!modifyUser}
                    onChange={handleModifyUser}
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className='text-left'>
                  <label>Delete User Account</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              
              <td>
                <div>
                  <input
                    type="radio"
                    checked={deleteUser}
                    onChange={handleDeleteUser}
                  />
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={!deleteUser}
                    onChange={handleDeleteUser}
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className='text-left'>
                  <label>Role Assignment</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={roleAssignment}
                    onChange={handleRoleAssignment}
                  />
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={!roleAssignment}
                    onChange={handleRoleAssignment}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}