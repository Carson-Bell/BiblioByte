// SPLASH PAGE

export default function page() {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: 0,
            display: 'flex',
            justifyConent: 'center',
            height: '100vh',
            backgroundColor: 'grey'
        }}>
            <div style={{
                boxShadow: '5px 5px 5px black',
                backgroundColor: 'white',
                padding: '0 18px',
                borderRadius: '50px',
                textAlign: 'center',
                width: '100%'
            }}>
                <div style={{ fontSize: '40px', marginBottom: '20px' }}>
                    <p>BiblioByte</p>
                    <div style={{ fontSize: '20px', marginBottom: '20px' }}>
                        <p>Search for a textbook, class, or school!</p>
                        <div style={{
                            margin: '20px 0',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <select style={{
                                padding: '10px',
                                marginRight: '10px',
                                width: '300px',
                                fontSize: '16px'
                            }}>
                                <option value="Textbook">Textbook</option>
                                <option value="Class">Class</option>
                                <option value="School">School</option>
                            </select>
                            <input type="text" placeholder="Search..." style={{
                                padding: '10px',
                                marginRight: '10px',
                                width: '300px',
                                fontSize: '16px'
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}