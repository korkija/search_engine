import React from 'react';
import 'antd/dist/antd.css';
import '../style/index.css';
import {CardPerson} from "./CardPerson";

export const ListPerson = ({peopleFilterForPage, findForDeletePerson}) => {
    return (
        <div className="container ">
            {peopleFilterForPage.map((item, index, array) => (
                <div key={item.id}>
                    {((index === 0) || (String(array[index - 1].first_name)[0] !== String(item.first_name)[0])) &&
                    <div>{String(item.first_name)[0]}</div>}
                    {(item.show === undefined) &&
                    <CardPerson
                        firstNamePerson={item.first_name}
                        lastNamePerson={item.last_name}
                        index={index}
                        idPerson={item.id}
                        agePerson={item.dob}
                        genderPerson={item.gender}
                        FindForDeletePerson={(id) => findForDeletePerson(id)}
                    />
                    }
                </div>
            ))}
        </div>
    )
};


