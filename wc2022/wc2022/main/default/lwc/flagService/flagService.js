export default class FlagService {

    mapping = {
        ARG: {
           ISO: 'AR'
        },
        AUS: {
            ISO: 'AU'
        },
        BEL : {
            ISO: 'BE'
        },
        BRA: {
            ISO: 'BR'
        },
        CMR : {
            ISO: 'CM'
        },
        CAN : {
            ISO: 'CA'
        },
        CRC : {
            ISO: 'CR'
        },
        CRO : {
            ISO: 'HR'
        },
        DEN: {
            ISO: 'DK'
        },
        ECU : {
            ISO: 'EC'
        },
        ENG : {
            ISO: null,
            flag: '\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F'
        },
        FRA: {
            ISO: 'FR'
        },
        GER : {
            ISO: 'DE'
        },
        GHA: {
            ISO: 'GH'
        },
        IRN: {
            ISO: 'IR'
        },
        JPN: {
            ISO: 'JP'
        },
        KOR: {
            ISO: 'KR'
        },
        MEX: {
            ISO: 'MX'
        },
        MAR: {
            ISO: 'MA'
        },
        NED: {
            ISO: 'NL'
        },
        POL: {
            ISO: 'PL'
        },
        POR: {
            ISO: 'PT'
        },
        QAT: {
            ISO: 'QA'
        },
        KSA: {
            ISO: 'SA'
        },
        SEN: {
            ISO: 'SN'
        },
        SRB: {
            ISO: 'RS'
        },
        ESP: {
            ISO: 'SP'
        },
        SUI: {
            ISO: 'CH'
        },
        TUN: {
            ISO: 'TN'
        },
        USA: {
            ISO: 'US'
        },
        URU: {
            ISO: 'UY'
        },
        WAL: {
            ISO: null,
            flag: '\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F'
        }
    }

    getFlag = function(code) {
        if (code.length != 2) {
            // Must be ISO 3166-1 alpha-2
            throw new Error(`Country Code "${code}" must be 2 characters`);
        }

        let base = 0x1F1E6 // hex of unicode code point for 🇦, "Regional Indicator Symbol Letter A"
        let a = 'a'.charCodeAt(0) // => 97. Used for calculating unicode offsets from base.

        let offset1 = code.toLowerCase().charCodeAt(0) - a // first character of the country code's offset from a
        let offset2 = code.toLowerCase().charCodeAt(1) - a // second character of the country code's offset from a

        // generate "Regional Indicator Symbol Letter" for each character in the country code
        // https://emojipedia.org/flag-united-states/
        let char1 = String.fromCodePoint(base+offset1) // first unicode code point for flag
        let char2 = String.fromCodePoint(base+offset2) // second unicode code point for flag

        return `${char1}${char2}` // combine unicode code points to make the flag emoji
    }

    getCode(country) {
        return this.mapping[country];
    }

}

