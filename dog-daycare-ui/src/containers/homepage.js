import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback } from "react";
import Image from 'next/image';
import logo from '../assets/dog_logo.png';

import styles from '../../styles/homepage.module.scss';

export function homepage({ownersList}){
    const [selectedOwner, setSelectedOwner] = useState('');
    const [petList, setPetList] = useState([]);
    const [selectedBackend, setSelectedBackend] = useState('node');
    const [apiUrl, setapiUrl] = useState('http://localhost:3001');
    const router = useRouter();

    const getPetsOfOwner = async () => {
		const response = await fetch(apiUrl + '/getPetsOfOwner/' + selectedOwner);
        const pets = await response.json();
        setPetList(pets);
	};

    useEffect(() => {
        if(selectedOwner !== ''){
            getPetsOfOwner()
        }
		
	}, [selectedOwner])

    useEffect(() => {
        if(selectedBackend === 'node'){
            setapiUrl('http://localhost:3001')
        } else if(selectedBackend === 'python'){
            setapiUrl('http://localhost:5000')
        }
		
	}, [selectedBackend])

    return (
        <div className={styles.container}>
            <div className={styles.header_container}>
                <Image 
                    src={logo} 
                    alt="Logo" 
                    width={50}
                    height={50}
                />
                <div className={styles.biz_name}>Dolly's Dog Daycare</div>
            </div>

            <div className={styles.sub_header_container}>
                <div className={styles.sub_header}>
                    Client List
                </div>
                <div className={styles.sub_header}>
                    Client's Pets
                </div>
            </div>

            <div className={styles.content_container}>
                <div className={styles.owners_container}>
                    {ownersList.map( e => (
                        <div 
                            className={selectedOwner === e.id ? `${styles.owner_details} ${styles.owner_details__selected}`  : styles.owner_details}
                            key={'owner-' + e.id} 
                            onClick={() => {setSelectedOwner(e.id)}}>
                                {e.first_name} {e.last_name}, {e.email}
                        </div>
                    ))}
                </div>
                <div className={styles.pets_container}>
                    {petList.map( p => (
                        <div 
                            className={styles.pet_details}
                            key={'pet-' + p.id}>
                                {p.name}, {p.breed}, {p.gender}
                        </div>
                    ))}
                    <div className={styles.add_pet_container}>
                        <div className={styles.add_pet_show_button}>
                            Add A Pet
                        </div>
                        <div className={styles.add_pet_form_container}>
                            
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className={styles.backend_buttons_container}>
                <div className={selectedBackend === 'node' ? `${styles.backend_buttons} ${styles.backend_buttons__selected}`  : styles.backend_buttons}
                    onClick={() => {setSelectedBackend('node')}}>
                    NodeJS
                </div>
                <div className={selectedBackend === 'python' ? `${styles.backend_buttons} ${styles.backend_buttons__selected}`  : styles.backend_buttons}
                    onClick={() => {setSelectedBackend('python')}}>
                    Python
                </div>
            </div>  
            
        </div>
        
    )
}

homepage.getInitialProps = async (ctx) => {
    const { query } = ctx;
    const response = await fetch('http://localhost:3001/getAllOwners');
    const ownersList = await response.json();
    return {ownersList: ownersList};
}