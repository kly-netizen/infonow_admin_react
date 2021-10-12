import React from 'react';
import {
    CardBody,
    Table
} from 'reactstrap';
import { DateTime } from '../../components/date-time';
import PropTypes from 'prop-types';
import CardReload from '../../@core/components/card-reload';
import { Button } from 'reactstrap'

import { useTranslation } from 'react-i18next'


const HistoryList = (props) => {

    const { users, isTeacher, fetchHistory, isReloading  } = props;
    const {t} = useTranslation()
   

    return (
        <CardReload className="p-0"
            title={isTeacher ? `${t('Students')}` : `${t('Teachers')}`}
            onReload={fetchHistory}
            isReloading={isReloading}>
           
            <CardBody>
                <Table responsive hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('Name')}</th>
                            <th>{t('Created At')}</th>
                            <th>{t('Action')}</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users && users.map((u, i) =>

                            <tr key={u.userId} >
                                <td>{i + 1}</td>
                                <td>
                                    <span className='align-middle font-weight-bold'>
                                        {u.name}
                                    </span>
                                </td>
                                <td><DateTime dateTime={u.createdAt} type="dateTime" /></td>
                                <td>
                                    <Button.Ripple  color='flat-primary'  >
                                        <span className='align-middle'>{t('View')}</span>
                                    </Button.Ripple>
                               </td>
                              
                            </tr>
                        )}
                    </tbody>
                </Table>
            </CardBody>
        </CardReload>
    );
};


HistoryList.propTypes = {
    users: PropTypes.array.isRequired,
    onBack: PropTypes.func
}


export default HistoryList;



