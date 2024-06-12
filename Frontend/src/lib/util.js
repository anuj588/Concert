import { format, parse } from "date-fns"

const formatDate=(date)=>{
    return format(parse(date,'yyyy-MM-dd',new Date()),'dd-MMM-yyyy')
}

const findslot = (id) => {
    switch (id) {
      case 1:
        return '10:00AM to 01:00PM'
      case 2:
        return '12:00PM to 03:00PM'
      case 3:
        return '03:00PM to 06:00PM'

    }
  }

export { formatDate ,findslot };