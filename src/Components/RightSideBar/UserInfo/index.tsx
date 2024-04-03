export default function UserInfo({ id, Name, Mail, Phone, CreatedAt }: { id: number; Name: string; Mail: string; Phone: number; CreatedAt: string }) {
    return (
      <div style={{
        display: 'flex',
        width: '100%',
        padding: '0px 20px',
        justifyContent: 'space-between',
        alignItems: 'center',
         
      }}>
   <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.5rem',
   
    //height: '140px'
}}>
    <p style={{
        color: '#737373',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        textTransform: 'capitalize'
    }}>Id</p>
    <p style={{
        color: '#737373',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        textTransform: 'capitalize'
    }}>Name</p>
    <p style={{
        color: '#737373',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        textTransform: 'capitalize'
    }}>Mail</p>
    <p style={{
        color: '#737373',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        textTransform: 'capitalize'
    }}>Phone</p>
    <p style={{
        color: '#737373',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        textTransform: 'capitalize'
    }}>Created at</p>
</div>

<div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '1.5rem',
   
    
}}>
    <p style={{
        color: '#212121',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal'
    }}>{id}</p>
    <p style={{
        color: '#212121',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal'
    }}>{Name}</p>
    <p style={{
        color: '#212121',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal'
    }}>{Mail}</p>
    <p style={{
        color: '#212121',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal'
    }}>{Phone}</p>
    <p style={{
        color: '#212121',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal'
    }}>{CreatedAt}</p>
</div>

      </div>
    )
  }
  