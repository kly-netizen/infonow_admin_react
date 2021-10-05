import React, { useEffect, useState } from 'react';
// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import {
    Card, CardBody, Row, Col, Button, Table, NavLink
} from 'reactstrap'


import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

// ** Store & Actions
import { connect } from 'react-redux'

import { withRouter } from 'react-router';
import {
    getTeacherDetails
} from './store/actions'

import { ChevronDown } from 'react-feather'
import { DateTime } from '../../components/date-time';
import UILoader from '../../@core/components/ui-loader';
import { useParams, Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import { GET_IMAGE_URL } from '../../helpers/url_helper';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './style.scss'

const TeacherDetails = (props) => {

    const { id } = useParams()

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        props.getTeacherDetails(id)
    }, [])


    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }
    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            // pageCount={props.newAssignments.length > 0 ? props.newAssignments.length / 10 : 1}
            pageCount={1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            nextLinkClassName='page-link'
            nextClassName='page-item next'
            previousClassName='page-item prev'
            previousLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        />
    )

    const columns = [
        {
            name: 'Name',
            sortable: true,
            minWidth: '250px',
            cell: t => {
                return (
                    <>
                        {
                            t.name
                        }
                    </>
                )
            }
        },
        {
            name: 'Email',
            sortable: true,
            minWidth: '250px',
            cell: t => {
                return (
                    <>
                        {
                            t.email
                        }
                    </>
                )
            }
        },
        {
            name: 'Date/Time',
            sortable: false,
            minWidth: '100px',
            cell: t => {
                return (
                    <>
                        <DateTime dateTime={t.createdAt} />
                    </>
                )
            }
        },
        {
            name: 'Action',
            minWidth: '250px',
            cell: t => {
                return (
                    <>
                        <Button.Ripple color='flat-primary'>
                            View
                        </Button.Ripple>
                    </>
                )
            }
        },
    ]

    const handleViewStudent = (id) => {
        props.history.push('/students/' + id)
    }


    return (
        <Fragment >
            <UILoader
                blocking={props.teacherLoading}
            >
                <Card>
                    <CardBody >
                        {
                            Object.keys(props.teacher).length > 0 &&
                            <>
                                <Row className="d-flex align-items-center">
                                    <Col sm='6'>
                                        <h4 className="m-0">
                                            Teacher Profile
                                        </h4>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col lg='8'>
                                        <div className="shadow-stats-item">
                                            <h5 className="m-0 p-1">
                                                Students
                                            </h5>
                                            <div>
                                                {
                                                    props.teacher.teacher.students.length == 0 &&
                                                    <div className="text-center p-1">
                                                        No Student Found
                                                    </div>
                                                }
                                                {
                                                    props.teacher.teacher.students.length > 0 &&
                                                    <Table responsive hover >
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Email</th>
                                                                <th>Assigned On</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {props.teacher.teacher.students.map((s, index) =>
                                                                <tr key={'student' + index} >
                                                                    <td>
                                                                        {s.user.name}
                                                                    </td>
                                                                    <td>
                                                                        {s.user.email}
                                                                    </td>
                                                                    <td><DateTime dateTime={s.createdAt} /></td>
                                                                    <td>
                                                                        <Button.Ripple color='flat-primary'
                                                                            onClick={() => handleViewStudent(s.user.userId)}
                                                                        >
                                                                            View
                                                                        </Button.Ripple>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg='4'>
                                        <div className="shadow-stats-item p-2 d-flex flex-column align-items-center">
                                            <div>
                                                <Avatar
                                                    img={GET_IMAGE_URL(props.teacher.profilePicture)}
                                                    size={'xl'}
                                                />
                                            </div>
                                            <h5 className="mt-2 mb-0">
                                                {props.teacher.name}
                                            </h5>
                                            <Link color="primary" to={'#'} >
                                                <small>{props.teacher.email}</small>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        }
                    </CardBody>
                </Card>
            </UILoader >
        </Fragment >
    )
}

const mapStateToProps = (state) => {

    const {
        teacher,
        teacherLoading,
        teacherError,
    } = state.Teachers

    return {
        teacher,
        teacherLoading,
        teacherError,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getTeacherDetails
    })(TeacherDetails)
)
