import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import AdminNav from '../../Components/admincomp/AdminNav';
import Greatings from '../../Components/Greatings';
import Adminheadrightbar from '../../Components/admincomp/Adminheadrightbar';
import CardL from '../../Components/hiringManagerCompo/CardL';
import CardS from '../../Components/hiringManagerCompo/CardS';
import axios from 'axios';

function Admindash(resreq) {
  const { user } = useContext(UserContext);
  const [carddetails, setCardDetails] = useState({
    vacancies: 0,
    hired: 0,
    admins: 0,
    interviwers: 0,
    candidates: 0,
    recruiters: 0,
    hiringmanagers: 0,
    newmessages: 0,
  });

  const getadmincount = async () => {
    try {
      const response = await axios.get('/dashboard/getadmincount');
      setCardDetails((prevState) => ({
        ...prevState,
        admins: response.data.admincount
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const getrecruitercount = async () => {
    try {
      const response = await axios.get('/dashboard/getrecruitercount');
      setCardDetails((prevState) => ({
        ...prevState,
        recruiters: response.data.recruitercount
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const gethiringmanagercount = async () => {
    try {
      const response = await axios.get('/dashboard/gethiringmanagers');
      setCardDetails((prevState) => ({
        ...prevState,
        hiringmanagers: response.data.hiringmanagercount
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const getinterviewercount = async () => {
    try {
      const response = await axios.get('/dashboard/getinterviewercount');
      setCardDetails((prevState) => ({
        ...prevState,
        interviwers: response.data.interviewercount
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const getcandidatecount = async () => {
    try {
      const response = await axios.get('/dashboard/getcandidatecount');
      setCardDetails((prevState) => ({
        ...prevState,
        candidates: response.data.candidatecount
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const gethired = async () => {
    try {
      const response = await axios.get('/reporting/getallhiredcount');
      setCardDetails((prevState) => ({
        ...prevState,
        hired: response.data.hiredcount
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const gettotalvacancies = async () => {
    try {
      const response = await axios.get('/dashboard/totalvacancies');
      setCardDetails((prevState) => ({
        ...prevState,
        vacancies: response.data.totalVacancies
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const getcountnewmassages = async () => {
    try {
      const response = await axios.get('/qanda/getcountnewmessage');
      setCardDetails((prevState) => ({
        ...prevState,
        newmessages: response.data.newMessagesCount
      }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getadmincount();
    getrecruitercount();
    gethiringmanagercount();
    getinterviewercount();
    getcandidatecount();
    gettotalvacancies();
    gethired();
    getcountnewmassages();
  }, []);

  return (
    <div>
      <div className='flex'>
        <div className=''>
          <AdminNav />
        </div>

        <div className='w-screen '>
          {!!user && (
            <div className='flex justify-between pt-8 pb-8 pl-5'>
              <div className='flex'><Greatings /><h1 className='text-3xl'>, {user.fname}</h1></div>
              <div className='mr-5'> <Adminheadrightbar /></div>
            </div>
          )}
          <div className='flex flex-col pt-8 pb-8 pl-5'>
            <div className="card_container mt-[10px] flex flex-col gap-5 ">
              <div className="flex justify-center gap-24 mb-6 card_container_1 ">
                <CardL name="Vacancies" val={carddetails.vacancies - carddetails.hired} />
                <CardL name="Hired" val={carddetails.hired} />
                <CardL name="New Qs" val={carddetails.newmessages} />
              </div>

              <div className="card_container_2 flex flex-row  mb-6 justify-center gap-14  sm:ml-[50px] sm:mr-[50px] lg:ml-[100px] lg:mr-[100px] ">
                <CardS name="Admins" val={carddetails.admins} />
                <CardS name="Candidates" val={carddetails.candidates} />
                <CardS name="Interviwers" val={carddetails.interviwers} />
                <CardS name="Recruiters" val={carddetails.recruiters} />
                <CardS name="Hiring Managers" val={carddetails.hiringmanagers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admindash;