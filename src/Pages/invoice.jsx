import React from 'react';
import { PDFViewer, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { useParams } from "react-router-dom";

const styles = StyleSheet.create({
  viewer: {
    flex: 1,
    width:window.innerWidth,
    height:window.innerHeight
  },
  page: {
    flexDirection: 'column',
    padding: '1cm',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '1cm',
  },
  logo: {
    width: '3cm',
    height: 'auto',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  companyAddress: {
    fontSize: 12,
    textAlign: 'right',
  },
  section: {
    marginBottom: '1cm',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '0.5cm',
    textAlign: 'center',
    textDecoration: 'underline',

  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: '0.5cm',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: '0.25cm',
    paddingLeft: '0.5cm',
    paddingRight: '0.5cm',
  },
  totalRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#000',
    paddingTop: '0.25cm',
    marginTop: '0.25cm',
  },
  totalLabel: {
    width: '50%',
    fontWeight: 'bold',
  },
  totalAmount: {
    width: '50%',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: '1cm',
    left: '1cm',
    right: '1cm',
    textAlign: 'center',
  },
});

const Invoice = () => {
  const { id, amount,name } = useParams();

  const invoiceData = {
    companyName: 'ABC Company',
    companyAddress: '123 Main Street, City, State',
    customerName: name,
    orderId: id,
    amount:amount,
    items: [
      { name: 'Product 1', price: 10.0 },
      { name: 'Product 2', price: 15.0 },
      { name: 'Product 3', price: 20.0 },
    ],
  };

  const calculateTotal = () => {
    let total = 0;
    invoiceData.items.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View>
              <Image src="data:image/jpeg;base64,/9j/
              4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFRg
              REREYERISGBIYEREZGBIYEhISGBUZGRkZGBkcIS
              4lHB4rHxoYJkYmKy8xNTY2GiU7QDszQC5CNTEBD
              AwMEA8QHhISHzQkISs0NjQxNTE0NDQ0NDE0NDQ0
              NDQ0NDQ0NDY0MTQ0NDQ0NjQ0NDQ0MTQ0NDE0NDQ
              xNDQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAA
              ACAwEBAQAAAAAAAAAAAAAAAgEDBQQGB//EAD4QA
              AICAQMBBgQDBQYFBQAAAAECAAMRBBIhMQUTIkFR
              YQYycYEUQrEjUpGhwTNicoLR8AcVQ0SSNLLC4fH
              /xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIEAwX/xA
              AnEQEBAAIBBAEEAQUAAAAAAAAAAQIRAwQhMVESE0
              FhgSIUMnGh0f/aAAwDAQACEQMRAD8A+YwhCejAhC
              EAhCEB4CKDGECxZakpEvSVFoEtlaxjKLUlgiJHEC
              G6yBIPWSIQ9Q5+0vAlNHUy8QJxDEkSYC4hGhAWEn
              EgiBGJMIQohCEAhIxJhBCEIBIkwgRCTCUeXhCEw0
              IQgIBBoQMCVjrEWOsB1lySoCWpKi1Y5lanmWrKLE
              McGIsHbygSJMpstCjk4nZp+zrGw1zDS1l6kd3B3ot
              qM6OE6shA6j1+uGzRaWHP2/rLe8X1ldT6dFB2vc5S
              hm3MErS5bSbVAAy9bIABnkZMuXUu+a6dLWO8XVoipW
              9lhrucMQrdWNYXCtjwjOZNiBYp/MI6/WWHtLVBV1ZW
              vu7Li6Oak7t7UoNLKPbZyV/eGZQ2senYt+mqYBNJjIZ
              HeqtiwO8H5rFOC+OQBxxG10shiJXr9O4AIel8AZyHrN
              jX+vUItR+pKfx630p270YW1/tCLE5Hdpb3e9h1QFsYz6
              iXaac2YScecIAYuDHiM2OYRIhiItq/SOCD0OYBiGJMICw
              MaGICwk4kYgEJG2TA8vCEJloQEBJgQYQgIDCOkWOolFix
              wYixxCLEEtWVrJLYlFjPiVpudhXWN9j/ACrkDJwT1JwOk
              rZiSFHGSAWOdqAkDc3oOYz2bFNac5wbMYYPYm/LoeoXbz
              9pKq6rVLSVdCHcbGWxl8Kq1bK9ZRuG5br7SrUixRXZcLD
              WQirYxLYqU7QoY524A4U+3EnTmtBVe47yq3va7x5o3TKn
              yOxgQfVWmgLr9PW1SWgPpnUpnHd6nTW/LhT83IBwOgLDy
              k2aXaFKKxrKNTWbFQV2VXocXLSWGHQngjY6MRjnBE1uyr
              FrPZ1/ei5dLqmp70Zw2m1JJXep5UqxsXHuOsw01r3tWUo
              RH2PpnYcVOHDEIQeFwofGT5n0E49PSiqAbSEfuHKIGOdz
              kOD5B0UZ5z1EaXb0teqTSaNNFqqy+iOr7Qo1OAO+rZGq7
              u1D1DKd5x5jI5mpqqmpvs/CsNRrKuzNIdE6qCX2nZZZUh
              zl9gyByes8eyaXacrqHco/ixUFNne+A887TXnI67j6SGT
              RozPTZqKGQ6l6iUXf4VBoG6sja7ncC3QcSaNtb4it1D0V
              3X216kl3QXd3ZVqiVRCyWBkXKpu4ILZ3dZT2P2al1C6nS
              6n8Ncj01WV3MqU6nUcWKtbg4IOwHY4xnHMO011WpXA1b
              a8IzLX+0Zn4oFrsqMchVGQW9VI9Jn94t1Wl7OB7j9tY2
              oscqqF7Sio+T0CoCOfX3lRoafVJewrsAp1FhUo+cU6h7b
              XZncnitApGCvBxK3UjG4EZAIyOqkZBHqCOc+c2vifWUZb
              TvWTTSDRVpXQVanS7EwltVg4epyqsQ2c7uOmZh9n6lnRa
              78srsU02pwSzWKtdaUbycCpcgnzXP2iUqcxLRwZdZWVZkOM
              qWU4IIyDg4I4I94s0jixL9Onn9ePvLhIX/X9YEyJMIEQkyIBI
              EGBxKamO7BPTMIvhCEDysIQmWhCEIBJEiTmAwliRFjoJQ6ywS
              pZasIlTK7bMDPn5CMYlOcmzxBa/kYbSBbjKBgfI4MCxmNaYB8
              dg8bq2VatwpCEY4IM6OxK/2ld1dgdlP7an5XCk4JTPzDac+vH
              nObR/t7O7YspfcdwA4bryPTrOrtns+utyUYL0IUEhk8IPPpnr
              Iq/WahNt+nuqCWBwVdAArujEB9vQEoTyOoMrrrwEN+bNq193Vu
              O1qGRsHevykNjjqevvIpsfIvdi12R3ZyQ9LIy8uhGCCvAEhRiWQ
              tdS5dRvOeKwQOFOxdikqOCwGRnryY6gZ6eQ/rFq6CV3agJnMqOpB
              xIatT1Akdg6bU66zuNKm9gMu7HCIvq7eX06me5P/Di8DH4uouRkIU
              ZQfXDZOf8Axk+UXVfPLdEOq5U4IyCQcEYI48iCR95Oo1QsDDVobWId
              lvUKL94pWupGPQ1LsBIxnr59dbtHs+3TOar0KMOgPRl/eU9GHuJwXVBhzCLbNc+mVE1NVfaWlrNv4GxiwRymEIVvmaoEnNZ4zjHGJr/Emqs1lWippV7G1R1Ftem21qKkLJWlahAF2LtfDYHBJPOZ5ui5a91dytZprNneqm3vQqMXHdFuEYtjPqMidXZmufQ2Cm51bTuahbfUC7HTBmseqp/3HdsMB57h6zOld+p07oz6O5lbU6TalbBsi2hQi11Voo5dQWc55xnPTjh3e02viGjTVINdW+qr1+ptN9Is7pXStmYs5Rf7NWDELkluB0GZnajY22ytQldihlrVmcUnzrZyBl14z9RNSpY590hTHkASgEmGIQCEIQCIqDk455jyF/qf1gEJMITTykIGEy0IQMIBAQgIFixxFEdZQCUtqCpG4Hb54xn7ZnQkHQHrJYR3aXSV2ruS4keYIXI+o4lq9iN+W0c+RQ9f/KYHdlWzWWVxk+HOcDk9PKbnZ2o1bKGVqrV9yQ2ffAnjl8p93XxfSz7XHv8Agz9g2dVsXJGDy65HocA8R/8AlF7MpsVbKxtDqHIZ0VdoAJA5wBz7TpXV6sf9qjfSwD9RLk7TvHzaJ/8AK6NMfUz/AA9/ocN9z9OF9DqmO56mY8ZbdWc4AA6N6ARLNNYgy6MgPAJHGcdMzWTtsjhtJqB7hNw/kZ36HWU6pDt8aNw6Hhh9fQ+eZqc2U8zsn9HxZdsb3/LzhbC/aZTI9tiVJ81joi/4mYKM+2SJv9q6Bqv71Z+R/wCjejfr+mN2VYE1lLMcBbasn08a8z3+Us3HBlhcMvjlNWPtPwnqtFodOgNiVC7LV7mAZ61OFbB5bjDE+rn1nf2/2nVcqVIt1+79oj0IbKjjcu1mCsD1Jxg4wD6Z8V8O6z8OlmocbjSmxv3lr01e0op8vGH+7Gaujv2GmyzH4jVX1jVWABcVqj2rUmOiZrVfcZzkmednfa7YuoXW26lj+Fzo7HrFmiFepUVJgK9lXe1piwctuTr5gief1Fex2TO7YzLnyO0kZ/lLtXpLdHqWC3vmt96Nvba+TuRyM4JIOenXMytTrAnnPTFirNRVkSnTuLK201hG6oO+mLOwCryz1IgHjd2YEf4ZpfDHZGp7QfwDu6FP7S4jIHsg/M36T1if8N7EdbateEdGDVsaSCrDoQRZ1+01ZXneXHG/G3uw+wuxxr9Hqdddqd9lR3ELl7SiVHwuDjbnC4OTgA/bJ7Ks3VvSxA7v9rVufai5IWxVXHjdjsPlwh+/q0/4baytStWqrK7t23NqAtt25wAecZH0J9ZzVfA3aVLiysVFwHAKvnh1Ktw6AdCRJItzx9vPyBNpvhLtBf8AtS3+F6T/APKZep0tlTGuxdjrjchKkrx54J5lJlL4qqEIQ0IQhAJC/wCv6yZC/wCsCYQhA8pCEJlRCEIAI2IojwJliysCWLKHUSHMkRSIROkQl3YbhtRuVIypbwjPtzKK1sobfU2PVfyn6idGiHDtjONg3bsbcnzH5ukZ1DA48sZ9s9JNSzu1MrLuNLQ9uuw8WmdsdWQbx/DyncnbSfmquX61t/SeX0O+u0d26pnOS5IQjBOGnodH8R0sPGTU3mGBx9iJz54a8R9Dh57lNW6v5jQ0vbVDsEDFWb5QyuufoSJX2h2e6N+K0oxZ1tpHy3DzIH736/XrdbVVqq8E7kPKMvzI37ynyPt5xeyrrkc6e8FiozXePkdM459G9v8A9Pl47z9x1d8tTL9We3TpO0K9VXkDIPhsQ9VPofQ+88v2v2JajFq1axRyrKMsB6MByCPXp5+w9e6qOgA3ElsADJPUn3lumPMY8lxvbwvJ085ZPle/uMbs74ipt091NrLTe9dnLnaj2hODuPALMoyPUmeo1lneV6UqCXsu07IMchVR2c+wCnH+Yesxe3OxFuHe1orXpztIO24D8rAEZb0Pn0PXjzVdmq19uHsZUVdjbcoldZ6oEHHOOh64Gek6+O/U/t8vk9Rw3gy1l49tP4u7XSy8rUe87tVTcvi3MuS2MdQCSM+0z+xuxmvYWXhkqB6dHf2HoPeep0OgrpXbWgHqfzH6mdPvO/Dp5O9u3zc+e3tjNOyz4nr0daUaesWWsMafTIMfRmx0X36nnHQkdXZ6dqsgd+06kdsk1HTIyoSc7QwIJA6dJmdg6DT6fvtVY23kl7nbJRSem4846AeZ4HMt0eq12sJs0pXS6YcVNZWXsv8AViu4bV9B/sTPCW9/PqPOTt/H92t9P+cj5NTobP8AHXeuf/Fj+k6Bqe2x10+hs/w3ahf/AHLMlNN2qvK6jSMBkkvVcoGPXa/SeS7c+Jda4as6pDX0Y0K6I/rhm8ZHl1wfeeGeMj145lfWmn258VdoMz0tZXTtyH/Dkk5xyO9JJ4/u4IM83/vPmTGZR3dTAAF6gXw24s+9wSV/JwB4fbPnFmHTMZPAhCEAhCEKJC9JMhekCYQhA8pCEJlRCEIAI8QSVgOJYsrjgyh1kNBDBoRXSpKvgKSCnJOHHJ+Uec7Oxb60396n7oYk7g4LcKF/n9s+U49M4XeCVGQuMjxEhuieh/pOjs6k3Mw+VQDh+OH4wMeY6yKtRx+IDbhgmzDFCVwQ2PB/SUXaYMOnMvdO6vUbmGx1G8AbsHqVB45zxHsTaSCCCCQQeoI4wfeUZ/Z3aL6R/wB5CfEnl9R7z3ej1SWoHrOVb+R8wfeeA1ycmek+ELwainmrZ+xH/wBGc/LjPLv6Lmy+XxvhvWtzLtKeZy2NzOirT3PVY+mUNaq+BTjk+eM8FgMkA8EgTn1t9O5a3l6J2n2i6t+H05/bsAWbqunQ/mPqx8l+58s1VCvS1ks21F5d2OWd2PUnqzEzP0OoorG0ue9JJsRlf8S1h5O5Mbi00uzKe8uY3jbZSqlNKwz3aWLne46MzKeeoAOJ9HC4dPhud6+JnOTreXV7T7O9GBAIOQeQfIiDTO7s6RxUc/hrSfw7H/pv1NTH06lT6fQzQYzv4uXHPHcfP5uny48rjl5jU7N0FV9RS5BYgdWCnoGXOD/Mj7mc3xN8SfhwadLtNy/OxGa6QPy4HV/boPPniW/iTVorXBKucKhHDB3YLkH1A3H/ACzwN7AAzx5s9XUMOOea77fiHVaim59Q7slfcjagrSoF2YHvAPE4IHAGRkc4idqdk30013WpsS8v3ZDK6sgVGVtyEgBg/APPhPEy69Mr6dgApssvrWsbHNpCI2djdNpZ1BXrkLNjtntvV2aerT6gsqorFEChFsTdtTKKAPDtZR9Jy2210SSTsRs9zpwc/wBjkZQLkG1+Q35x/e+3lEj3lQlSgqdtNQJVmYFiu45z8rZbBUcAgyvcPWWCYQhCCEIQCQvQfaTIEKmEIQPKQhCZUQhCAGSsiCwLBJMiSZRYsl4qxmhCUHD4yQHVkOF3E7h0A9+BF037Nw6Ha3Kj6sNv9f5RbiRhlJBUggjqI2or2uHCEqcOqs2SVPQsRIq3V12ABmDA5IUtndlcZxnnjI5nZewO1wMB1VgN24jPXcfUkE/eRrtb3qqu0DgHPO4OR4gPboPtKNI2UKfmQsygKSzKeXJbyC4H8ZQmor3CU9maxtNZuxlDw49ROwzO1XuJMpLGsM7jlLHsL+0qV2s1igOAV55I9ceQ956P4e16ICc5DYII5BE8N2PWiIHXAyMuxxgY659hOnszX7K3VFZA7v3Fjr+xXc52KcHIBHGTwCR1nlydP8cZZdvocPW7ysymo+h6/wCIa6DWzqWrZttloxijI8JYdcE8Z6D7jLduaE27NXpSv4ugfs+Rt1FfU0sfMHnBPQn3M8x2frF1CMrrhhlL6W8j0ZSPSV9nah9K40zuTU+fw1hPOPOtz+8P5jH28ZLP8umzHLV32vi+q9lpfwnaWnOUwtgK2V/LZVYDyP7rKwz9pj9l6HDPotS+3UVDcj9E1NH5bF9/IjyIM4NZZZpnOtoyQcfi6h/1EH/VUfvKOvqOfKdnaupTVUd4SDsUtVaOCA+FZc+asDtI+npPbh5bx5dvFc3UdPc8bcr3n+4ye2dergU1tvqrJO/yss6bh/dA4H1J8553XN4TOt2nLRQLrQr7u7rUvdsNYsFKY3lN/hLcjgzoyytu6+ZIm8moaUbe8WsC56++Jrd7GDjG35DtCAjrlT99v4x7XHaWor7ulVZxXWOTusZtvhbJwMMzgHjryfQ+C+19Oupvu7RQ2GxWfbsqNJZXVx4D+fcAFx7zi0YV9RZeMvXSLHBesOrM5K1painC7snnOAR5zCujtSzfa5JY+LaC+zftTCKG2eHIVQOOOJy4HpA/6frJmkEIQhBCEIEGTIboZMKIQhA8pCEJlRCEIBJWRCBOZYJWBHECxZJMUGSsqIdciIhymBtDVk8YO9wf6Lj+cuIlIc1tvBIHR8YyUPDAfUSK7uwLawx7wguGLoCpyu1ckhseg6Z8py2OEffXu2jqpOGZPNSR6jiVavwnIGAwDKMgkK3QH3xNWjT1Ggs2VcitnAIZlPiC8HoDmBU2CN642tg8ZKox52EnqQJTZWG4xKaLzXlSNyHPhJO1WOBvwOpAndsGQyncjb+7boWUMV3Feq59DKMjZsYBidhI3Lk4OCPKejv1SNWaqttj2gKiAjCruBLMR8oGP4/SZupo3SnsrVrRYd4O0jGQM45z0msctfxvipfbedrhYHFYW8LnCsWTU1JgMvIB7xcjHqD9JtA1aunGco+CGHz1uOjD0YH/AHzMOp31Di2tzTXWHWttql3LEb2weg8IGPbyzLKLbKWa7aGUWNXqkXhS4baLkHlu4yPU+/Hly8WruePs7+m6iWXHLv7/AOtfs7tE1k0ah1S1MYckBbU/Ky59fT1BExrNis4rytRd2RMnYoLHGF6Dgx+19YlpQqDhBgE9Tkkn7TP1GpCgn0yf4Rhjru8up57nfjLuTxfZtVftHv6DrDXk6ev8P1sdkfUsBW6gjPd90w5A2N4h+99JZh9K28/+rU5TBIOkdHUh88pbvQsMflz6zY+Dl0DabUtq+bcqKEsfZW1iI7oEKYYdcHJwcqPOatc0dHxIez002nOlINxrpOoLBhcVNQ2F8eAHqWA5yVJmbTV3VS1kYssO+0FbEsQHhK3B4YYAcHH5/wCPF2fpxY+91HcUkF8qxSx8Fkobb8u8K3PlgzstsLsWYkk+pJIAGAMnnAGB9pYUhkyDJlQQhCEEIokM3pCmboZMrJ4k7oDwiboQPLwhCZUQhCAQgYCBIjCII2YDiOplamMDKi0RHTMYSYFOncY7t+VJJTAH9ocAbj+7ItXu9wHHJBx0ODjr5jMm2vMhHDAV2HaBtVLDnbWg3E5UfNkmRVzvXUib6xa1iB2LMwCqWICrjz8J5l/cPW7dyGevbU7pgElGxYqtgZ4PUj09DOVLXrVVtqSwKA1YfOVDcjkdV88Tu/FjCh2bfYRbZajBTW4yqIB5gKMY+kgWvUI/nsbC+E/Kzs+NqH0CkHJ9DKdToictjjD4ccrhG2scjyzgZ9x6xLrmsZV2h7GwowAC7epx1PvNM9kN39OmouDHVVqwbLCseN9y5XOVDVk5x9vOUc+h11lKFNikru2k5G0+eVxzj0l+n1lndilULFmLOwDM7vy58uv5vtCujWO2oUPn8IuqbUs3AAbw24O3JLBOB6DjEs1OlsQFtR2hTW5VLRWGta0k0AJ4UQBSUKryejS3Let/Zcbcd6+6hq2O3vHWlWNfJ8bhXRnRwi8lfCB7FhJ0rsx2aatjYVBexiu9Q1RS1d3yrWSzHnnpzNgfDdKBhZ+IIWre2t21V6OomkOm3JY2clUIyOSQIazTUWVtXVZVpW1S6PU1CxtlT1dyyWV7sYBW0M2D6TOzRfh7QVsNTXqkLNU2nDW12VldPW4dmt3E7GQYXPPnwczg1nZm20U0W1ajvF312K21ChQuN5b5GwM7T7euYJUqJZptMq2h6x+I1TF1qseljeRUGwMqMKM8tgnHIMZmStWppJKE4ezBU6kK7NW7oc7CobGB9/azaXTodkUCun+zXo5UJZaSSQ9oBwzDcVB8hgRAZzI58vKP3h9JpF3p9f6GPKN7eknvCOuBAuhKGvHkYlTkt1JHnA6oYkZhmBDD+n6wxIY/qP1k5hBiEjMIHlycRIYjTDSRCECZQGEDCACBhCA4jSsRgYFm6ShlZMdZUWyl0BlgMUmBXXa1fBXemdxQ8bmCFRk9eAekurVbMCtvEdihGwGZypLEeQUEYyfWLIFAOZFRQ71AsqgO6qUc87VJ5IBGDkAjP1nenaeQjZ2WVU6usBU2qC6Ns27eBy7fScid4h8LnGU4PIOxtyjnyB8ob2IIKIThhuxg5Z95bjz8vYGNG2nZ24XW0Z2Gyhxbwc3al0RGJ+irj6lj5xtX2klqJW+qcVbKEepaVJJQL1dsE8qPPymazA5/YoM95jluN6gKP8uMj6y5LCDuVETDKw8OcYr2Ec+R5Yj1jRt009o6h3qNe52SpNOyN4qbMq3hYE7cMo6E87MxKkVgnev3iIE2UozYWtw7Mgb8jBiOOesRckAMxYKEABPGEBC8ewJ59zLRLpNme5iAnhVBt8CDbWXVAm8r5uQOW9zIzEB5jEyoA0dXPrKSZIf2gX95HFntOcN7RgfP0gXbx6SVZfpIB5+v6xsCFTuEMyNg9IgT3PECx/8ASKVH0isp9ZGWziA2D6wi7j6QhHnI2IQmWgYsIQJEmEIECSYQgEYGRCBJlimEJUMDFJhCBIMsqPX7SYQDMAYQlDAx1MIQHUZ85Ow+sIQBPX+EdmxCEIQHJjoYQlDAxlhCQOen+GWBoQlAXi7gvWEJFHeqfP8AX0kseQfsfvCEBoQhA//Z" style={styles.logo} />
            </View>
            <View>
              <Text style={styles.companyName}>{invoiceData.companyName}</Text>
              <Text style={styles.companyAddress}>{invoiceData.companyAddress}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Invoice</Text>
          </View>
          <View style={styles.section}>
            <Text>Customer: {name}</Text>
            <Text>Order ID:{id}</Text>
</View>
<View style={styles.section}>
<View style={styles.table}>

<View  style={styles.tableRow}>
<Text style={styles.tableCell}>Service</Text>
<Text style={styles.tableCell}>{amount}</Text>
</View>

<View style={styles.totalRow}>
<Text style={styles.totalLabel}>Total</Text>
<Text style={styles.totalAmount}>{amount}</Text>
</View>
</View>
</View>
<View style={styles.footer}>
<Text>Thank you for choosing us!</Text>
<Text>We appreciate your dedication.</Text>
</View>
</Page>
</Document>
</PDFViewer>
);
};

export default Invoice;
